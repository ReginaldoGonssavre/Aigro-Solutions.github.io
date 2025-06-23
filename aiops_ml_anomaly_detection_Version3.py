"""
Exemplo de detecção de anomalias com ML para eventos AIOps.
Pode ser expandido para pipelines quânticos e workloads complexos.
"""

import numpy as np
from sklearn.ensemble import IsolationForest

# Simula métricas coletadas
metrics = np.random.normal(loc=0, scale=1, size=(100, 3))
anomaly_metrics = np.random.normal(loc=5, scale=1, size=(5, 3))
all_metrics = np.vstack([metrics, anomaly_metrics])

model = IsolationForest(contamination=0.05)
model.fit(all_metrics)
preds = model.predict(all_metrics)

for idx, pred in enumerate(preds):
    if pred == -1:
        print(f"Anomalia detectada na métrica {idx}: {all_metrics[idx]}")