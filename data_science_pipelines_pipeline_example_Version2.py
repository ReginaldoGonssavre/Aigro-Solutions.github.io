import pandas as pd
from data_science.quantum_benchmark.qml_benchmark import quantum_predict

def processa_sinais_vitais(df):
    df["media_pressao"] = (df["pressao_sistolica"] + df["pressao_diastolica"]) / 2
    return df

def benchmark(df):
    risco_classico = df["media_pressao"].mean() > 100
    risco_quantico = quantum_predict(df)
    return {"classico": risco_classico, "quantico": risco_quantico}