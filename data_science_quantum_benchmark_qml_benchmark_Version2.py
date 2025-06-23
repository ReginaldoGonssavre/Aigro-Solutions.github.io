def quantum_predict(df):
    # Simulação de predição QML: risco cardiovascular
    if df["media_pressao"].mean() > 105:
        return True
    return False