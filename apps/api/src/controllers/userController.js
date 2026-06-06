const listUsers = (req, res) => {
  // Mock implementation for list users
  res.status(200).json([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ]);
};

const createUser = (req, res) => {
  // Mock implementation for create user
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  
  const newUser = {
    id: 3,
    name,
    email
  };
  
  res.status(201).json(newUser);
};