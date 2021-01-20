#include <stdlib.h>
#include <time.h>
#include <stdlib.h>

double pi_mcmc(long n) {
    srand((unsigned)time(NULL));
    int t = 0;
    for (long i = 1; i <= n; i++) {
        double x = (double)rand() / RAND_MAX;
        double y = (double)rand() / RAND_MAX;
        if (x * x + y * y <= (double) 1.0)
            t++;
    }
    return ((double) 4.0)*((double) t)/((double) n);
}

int main(int argc, char *argv[]) {
   long n = atol(argv[1]);
   printf("%f\n", pi_mcmc(n));
   return 0;
}
