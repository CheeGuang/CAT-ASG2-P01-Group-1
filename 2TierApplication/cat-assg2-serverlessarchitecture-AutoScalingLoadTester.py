from locust import HttpUser, between, task

class MyUser(HttpUser):
    wait_time = between(1, 2)  # wait time between requests

    @task
    def my_task(self):
        self.client.get("/")  # adjust the endpoint as needed

# Run the following in the Command Line:
# locust -f cat-assg2-serverlessarchitecture-AutoScalingLoadTester.py --headless -u 500 -r 10 --host=http://cat-assg2-2tierapplication-LB-323339426.us-east-1.elb.amazonaws.com