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
def npmode1(arr):
    unq = np.unique(arr, return_counts=True)
    return unq[0][unq[1].argmax()]

ipython.magic("time df.apply(npmode1, axis=0)")
