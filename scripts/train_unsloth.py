#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script de Fine-Tuning autoDesign DSL avec Unsloth (QLoRA 4-bit)
Optimise pour GPU 8 Go (RTX 4060 Ti).
"""

import os
import torch
from unsloth import FastLanguageModel
from datasets import load_dataset
from trl import SFTTrainer
from transformers import TrainingArguments

# 1. Configuration
MODEL_NAME = "unsloth/Qwen2.5-Coder-3B-Instruct-bnb-4bit"  # ou 1.5B: "unsloth/Qwen2.5-Coder-1.5B-Instruct-bnb-4bit"
MAX_SEQ_LENGTH = 1024
DATASET_PATH = os.path.join(os.path.dirname(__file__), "data", "autodesign_train_dataset.jsonl")
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "output_lora")
GGUF_DIR = os.path.join(os.path.dirname(__file__), "autodesign_model_q4_k_m")

def main():
    print("=" * 60)
    print("🚀 Démarrage du Fine-Tuning autoDesign DSL avec Unsloth")
    print(f"Modèle de base : {MODEL_NAME}")
    print(f"Dataset         : {DATASET_PATH}")
    print("=" * 60)

    # 2. Chargement du modèle en 4-bit
    model, tokenizer = FastLanguageModel.from_pretrained(
        model_name=MODEL_NAME,
        max_seq_length=MAX_SEQ_LENGTH,
        dtype=None,  # Auto-detection (float16 / bfloat16)
        load_in_4bit=True,
    )

    # 3. Configuration LoRA (PEFT)
    model = FastLanguageModel.get_peft_model(
        model,
        r=16,
        target_modules=["q_proj", "k_proj", "v_proj", "o_proj", "gate_proj", "up_proj", "down_proj"],
        lora_alpha=16,
        lora_dropout=0,  # Optimisé pour Unsloth (0 = fast)
        bias="none",
        use_gradient_checkpointing="unsloth",
        random_state=42,
    )

    # 4. Chargement & Formatage du Dataset
    dataset = load_dataset("json", data_files=DATASET_PATH, split="train")

    def format_chatml(examples):
        texts = []
        for messages in examples["messages"]:
            text = tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=False)
            texts.append(text)
        return {"text": texts}

    dataset = dataset.map(format_chatml, batched=True)

    # 5. Paramètres d'entraînement
    training_args = TrainingArguments(
        output_dir=OUTPUT_DIR,
        per_device_train_batch_size=2,
        gradient_accumulation_steps=4,
        warmup_steps=10,
        max_steps=200,  # ~2-3 epochs selon la taille du dataset
        learning_rate=2e-4,
        fp16=not torch.cuda.is_bf16_supported(),
        bf16=torch.cuda.is_bf16_supported(),
        logging_steps=10,
        optim="adamw_8bit",
        weight_decay=0.01,
        lr_scheduler_type="cosine",
        seed=42,
    )

    trainer = SFTTrainer(
        model=model,
        tokenizer=tokenizer,
        train_dataset=dataset,
        dataset_text_field="text",
        max_seq_length=MAX_SEQ_LENGTH,
        dataset_num_proc=2,
        packing=False,
        args=training_args,
    )

    print("\n⏳ Début de l'entraînement...")
    trainer.train()

    print("\n💾 Sauvegarde des adaptateurs LoRA...")
    model.save_pretrained(OUTPUT_DIR)
    tokenizer.save_pretrained(OUTPUT_DIR)

    # 6. Export GGUF pour Ollama
    print("\n📦 Export du modèle en format GGUF (Q4_K_M) pour Ollama...")
    model.save_pretrained_gguf(
        GGUF_DIR,
        tokenizer,
        quantization_method="q4_k_m"
    )

    print("\n" + "=" * 60)
    print("✅ ENTRAÎNEMENT ET EXPORT TERMINÉS AVEC SUCCÈS !")
    print("Pour importer dans Ollama, exécutez simplement :")
    print("  ollama create autodesign -f ./scripts/Modelfile")
    print("  ollama run autodesign")
    print("=" * 60)

if __name__ == "__main__":
    main()
