import React, {useEffect,useState} from 'react'
import axios from 'axios';
import Heart from './Heart';


const DataForm = () => {

  
    const [data, setData] = useState([]); 
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [error, setError] = useState(null);
    const [editItem, setEditItem] = useState(null);

    useEffect(() => {
        axios
        .get('https://cute-puppy-22c254.netlify.app/.netlify/functions/api/')
        .then((response) => {
            setData(response.data)
        })
        .catch((error) => {
            console.log('There was an error', error);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
      
        if (!name || !age) {
          alert('Recipe and ingredients are required');
          return;
        }
      
        const url = editItem
          ? `https://cute-puppy-22c254.netlify.app/.netlify/functions/api/${editItem._id}`
          : 'https://cute-puppy-22c254.netlify.app/.netlify/functions/api/';
      
        const method = editItem ? 'put' : 'post';
      
        axios[method](url, { name, age })
          .then((response) => {
            console.log(response.data); // Log the response data
            
            if (editItem) {
              setData(
                data.map((item) =>
                  item._id === editItem._id ? response.data : item
                )
              );
            } else {
              setData([...data, response.data.author]);
            }
            
            setName('');
            setAge('');
            setEditItem(null);
            setError(null);
          })
          .catch((error) => {
            console.log('There was an error!', error);
          });
      };

    
      const handleEdit = (_id) => {
        const itemToEdit = data.find((item) => item._id === _id);
        setEditItem(itemToEdit);
        setName(itemToEdit.name);
        setAge(itemToEdit.age);
      };
      
      const handleDelete = (_id) => {
        axios
          .delete(`https://cute-puppy-22c254.netlify.app/.netlify/functions/api/${_id}`)
          .then(() => {
            setData(data.filter((item) => item._id !== _id));
          })
          .catch((error) => {
            console.error('There was an error!', error);
          });
      };
      
  return (
    <div className='container-fluid'>
        <div >
            <h2 className='text-center mt-5'>Recipe Book</h2>
            <div className='container-fluid'>
            <form onSubmit={handleSubmit}>
            
                <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Recipe'
                className="form-control"
                style={{ width: '300px' }} 
                />
                <br/>
                <textarea
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder='Ingredients'
                rows={4}
                cols={20}
                className='mt-2 form-control'
                />
                <br />
                <button type='submit' className='btn btn-sm mt-3 pl-5 mb-5 btn-primary'>{editItem ? 'Update Recipe' : 'Add Recipe'}</button>
            </form>
            </div>
            
            {error && <p>{error}</p>}
            
            <table className="table table-sm table-striped table-hover mb-5">
                <thead className='table-warning'>
                    <tr>
                        <th>Recipe</th>
                        <th>Ingredients</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item._id}>
                            <td>{item.name}<Heart onClick={() => console.log('Heart is Clicked')}/></td>
                            <td>{item.age}</td>
                            <td>
                                <button onClick={() => handleEdit(item._id)} className='btn btn-sm btn-success m-1'>Edit</button>
                                <button onClick={() => handleDelete(item._id)} className='btn btn-sm btn-danger m-1'>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    </div>
  )
}

export default DataForm