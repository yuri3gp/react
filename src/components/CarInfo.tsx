import React, { useEffect, useState } from 'react';

interface Car {
  make: string;
  model: string;
  year: number;
  color: string;
  price: number;
  features: string[];
}

const CarInfo: React.FC = () => {
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch('yuri3gp.duckdns.org:3000/car');
        if (!response.ok) {
          throw new Error('Failed to fetch car data');
        }
        const data: Car = await response.json();
        setCar(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Car Information</h1>
      {car && (
        <div>
          <p><strong>Make:</strong> {car.make}</p>
          <p><strong>Model:</strong> {car.model}</p>
          <p><strong>Year:</strong> {car.year}</p>
          <p><strong>Color:</strong> {car.color}</p>
          <p><strong>Price:</strong> ${car.price}</p>
          <h3>Features:</h3>
          <ul>
            {car.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CarInfo;
