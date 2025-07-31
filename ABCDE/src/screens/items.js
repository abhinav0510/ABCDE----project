import React, { useEffect, useState } from 'react';

function Items({ token }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/items')
      .then(res => res.json())
      .then(setItems);
  }, []);

  const addToCart = async (itemId) => {
    await fetch('http://localhost:8080/carts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify({ item_id: itemId })
    });
  };

  const handleCheckout = async () => {
    const res = await fetch('http://localhost:8080/orders', {
      method: 'POST',
      headers: { Authorization: token }
    });
    if (res.ok) alert('Order successful');
  };

  const showCart = async () => {
    const res = await fetch('http://localhost:8080/carts', {
      headers: { Authorization: token }
    });
    const data = await res.json();
    alert(`Cart: ${JSON.stringify(data.items || [])}`);
  };

  const showOrders = async () => {
    const res = await fetch('http://localhost:8080/orders', {
      headers: { Authorization: token }
    });
    const data = await res.json();
    alert(`Orders: ${data.map(o => o.id).join(', ')}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Items</h2>
        <div className="space-x-2">
          <button onClick={handleCheckout} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Checkout</button>
          <button onClick={showCart} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Cart</button>
          <button onClick={showOrders} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Order History</button>
        </div>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map(item => (
          <li key={item.id} className="bg-white p-4 rounded shadow hover:shadow-lg transition">
            <div className="text-lg font-medium">{item.name}</div>
            <div className="text-gray-600 mb-2">${item.price.toFixed(2)}</div>
            <button
              onClick={() => addToCart(item.id)}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Items;
