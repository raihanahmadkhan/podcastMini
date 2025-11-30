from transformers import pipeline, AutoTokenizer, AutoModelForSeq2SeqLM
import nltk, math

MODEL_NAME = "facebook/bart-large-cnn"
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME)
summarizer = pipeline("summarization", model=model, tokenizer=tokenizer, device_map="auto")

def chunk_by_tokens(text, max_tokens=1200, overlap_tokens=100):
    tokens = tokenizer.encode(text)
    chunks = []
    start = 0
    while start < len(tokens):
        end = min(start + max_tokens, len(tokens))
        chunk = tokenizer.decode(tokens[start:end], skip_special_tokens=True)
        chunks.append(chunk)
        start = end - overlap_tokens
        if start < 0: start = 0
        if end == len(tokens): break
    return chunks

def map_summaries(chunks, max_len=220, min_len=90):
    mapped = []
    for i, ch in enumerate(chunks, 1):
        prompt = ("Summarize clearly, keep proper nouns, figures, and actionables.\n\n" + ch)
        out = summarizer(prompt, max_length=max_len, min_length=min_len, do_sample=False)[0]["summary_text"]
        mapped.append(out)
    return mapped

def reduce_summary(mapped, target="medium"):
    text = "\n".join(mapped)
    if target == "short":
        max_len, min_len = 140, 60
    elif target == "detailed":
        max_len, min_len = 380, 180
    else:
        max_len, min_len = 240, 120
    prompt = "Create a coherent single summary with logical flow and no repetition:\n\n" + text
    return summarizer(prompt, max_length=max_len, min_length=min_len, do_sample=False)[0]["summary_text"]

def summarize_long_text(transcript_text, target="medium"):
    chunks = chunk_by_tokens(transcript_text)
    mapped = map_summaries(chunks)
    return reduce_summary(mapped, target=target)
