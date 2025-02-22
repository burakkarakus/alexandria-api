With this API, you can easily have up and running library management application,
which is not CNCF ready, because it is out of scope of this interview case.

To make it cloud native, I could have taken the actions below:
1. Stateless systems such as Redis and Postgre must be in cloud (or at least on prem but in different dockerized envs)
2. K8S is a must, but for now this application can work in single container. (because we don't use k8s, we could use pm2)
3. 