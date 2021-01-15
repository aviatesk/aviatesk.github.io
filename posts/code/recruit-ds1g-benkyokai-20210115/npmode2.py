# %% setup
from IPython import get_ipython
ipython = get_ipython()

import numpy as np
import pandas as pd

nrow = 100
ncol = 400_000
np.random.seed(0)
df = pd.DataFrame(np.random.choice([-1,0,1],(nrow,ncol)))

# %% code
def npmode2(df):
    arr = df.to_numpy()
    max, min, ncol = arr.max(), arr.min(), arr.shape[1]
    offset = np.arange(ncol) * (max-min+1) - min
    return np.bincount((arr+offset).ravel()).reshape(ncol, -1).argmax(1) + min

ipython.magic("timeit npmode2(df)")
