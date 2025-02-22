With this API, you can easily have a library management application up and running. You can see [db-diagram](hthttps://github.com/burakkarakus/alexandria-api/blob/main/db-diagram.md) and [api-diagram](https://github.com/burakkarakus/alexandria-api/blob/main/api-diagram.md) in mermaid mode, by opening them in github or using [mermaid.live](). 


Note that it is not CNCF ready, as it is out of scope for this interview case.

To make it cloud-native, the following actions could be taken:
1. Stateless systems such as Redis and PostgreSQL must be in the cloud (or at least on-prem but in different dockerized environments).
2. Kubernetes (K8S) is a must, but for now, this application can work in a single container. (Since we don't use K8S, we could use PM2).
3. Implement the ELK stack and Prometheus stack to manage logging, monitoring, and tracing.
4. The following technologies were not used due to lack of experience:
    - Webpack & Babel
