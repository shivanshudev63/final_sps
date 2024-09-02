import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Configure = () => {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [services, setServices] = useState([]);
  const [plans, setPlans] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [features, setFeatures] = useState('');
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const customer_id = queryParams.get('customer_id');
  axios.defaults.withCredentials = true;

  useEffect(() => {
    // Check if the user is authenticated
    axios.get('http://localhost:8081')
      .then(res => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setName(res.data.name);

          // Fetch available services and plans
          axios.get('http://localhost:8081/services')
            .then(serviceRes => setServices(serviceRes.data))
            .catch(err => console.log("Error fetching services:", err));

          axios.get('http://localhost:8081/plans')
            .then(planRes => setPlans(planRes.data))
            .catch(err => console.log("Error fetching plans:", err));

        } else {
          setAuth(false);
          setMessage(res.data.Error);
          navigate('/login'); // Redirect to login page if not authenticated
        }
      })
      .catch(err => {
        console.log("Error during authentication check:", err);
        setAuth(false);
        setMessage('An error occurred during authentication.');
        navigate('/login'); // Redirect to login page on error  
      });
  }, [navigate]);

  // Handle service selection
  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };

  // Handle plan selection and fetch associated features
  const handlePlanChange = (event) => {
    const selectedPlan = event.target.value;
    setSelectedPlan(selectedPlan);

    // Fetch the features for the selected plan
    axios.get(`http://localhost:8081/plans/${selectedPlan}`)
      .then(res => setFeatures(res.data.features))
      .catch(err => console.log("Error fetching plan features:", err));
  };

  // Handle form submission to enroll the service
  const handleSubmit = (event) => {
    event.preventDefault();

    const newService = {
      customer_id: customer_id,
      service_id: selectedService,
      plan: selectedPlan,
    };

    axios.post('http://localhost:8081/customer-service/enroll', newService)
      .then(res => {
        if (res.data.Status === "Success") {
          alert('Service enrolled successfully!');
          navigate(`/home?customer_id=${customer_id}`);
        } else {
          alert('Failed to enroll service.');
        }
      })
      .catch(err => console.log("Error enrolling service:", err));
  };

  return (
    <div>
      {auth ? (
        <div>
          <h3>Welcome, {name}</h3>
          <h4>Configure Your Services</h4>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Select Service: </label>
              <select value={selectedService} onChange={handleServiceChange} required>
                <option value="">Select a service</option>
                {services.map(service => (
                  <option key={service.id} value={service.id}>
                    {service.service_name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Select Plan: </label>
              <select value={selectedPlan} onChange={handlePlanChange} required>
                <option value="">Select a plan</option>
                {plans.map(plan => (
                  <option key={plan.id} value={plan.plan_name}>
                    {plan.plan_name}
                  </option>
                ))}
              </select>
            </div>
            {features && (
              <div>
                <h5>Plan Features:</h5>
                <p>{features}</p>
              </div>
            )}
            <button type="submit">Enroll Service</button>
          </form>
        </div>
      ) : (
        <div>
          <h3>{message}</h3>
          <h3>Login Now</h3>
          <Link to="/login">Login</Link>
        </div>
      )}
    </div>
  );
};

export default Configure;
