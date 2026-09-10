import os
from openai import OpenAI
import chromadb

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
chroma_client = chromadb.Client()

collection = chroma_client.create_collection(
    name="rag_docs",
    metadata={"hnsw:space": "cosine"}
)

def load_documents():
    path = "C:/Users/rlawjdgns213/Documents/GitHub/Samsung_Heavy_Industry_AI_Specialist_Education/바이브코딩/RAG 실습/data/docs.txt"
    with open(path, "r", encoding="utf-8") as f:
        docs = [line.strip() for line in f.readlines() if line.strip()]
    return docs

documents = load_documents()


documents = load_documents()

def embed_text(texts):
    response = client.embeddings.create(
        model="text-embedding-3-small",
        input=texts
    )
    return [item.embedding for item in response.data]

def build_vector_db():
    embeddings = embed_text(documents)
    collection.add(
        documents=documents,
        embeddings=embeddings,
        ids=[f"doc_{i}" for i in range(len(documents))]
    )
    print("문서가 ChromaDB에 저장되었습니다.")
    
build_vector_db()