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
ipython.magic("time df.mode()")
