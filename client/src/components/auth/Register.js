import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types'

// Props ins destructured so you only have to use setAlert
const Register = ({ setAlert, register }) => {

  // formData is state and setFormData is like setState
  //useState is a hook
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if(password !== password2){
            setAlert("Password does not match", 'danger');
        } else {

            register({ name, email, password});
            // const newUser = {
            //     name,
            //     email,
            //     password
            // }

            // try {
            //     const config = {
            //         headers: {
            //             'Content-Type': 'application/json'
            //         }
            //     }

            //     const body = JSON.stringify(newUser);

            //     const res = await axios.post('/api/users', body, config);

            //     console.log(res.data);

            // } catch (err) {
            //     console.error(err.response.data);
            // }
        }
    }

    return <Fragment>
    <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input type="text"
           placeholder="Name" 
           name="name" value={name}
           onChange={e => onChange(e)}
            required />
        </div>
        <div className="form-group">
          <input type="email" onChange={e => onChange(e)} placeholder="Email Address" name="email" value={email} required />
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>
        <div className="form-group">
          <input
            type="password"
            onChange={e => onChange(e)}
            placeholder="Password"
            name="password"
            value={password}
            minLength="6"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            onChange={e => onChange(e)}
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/Login">Sign In</Link>
      </p>
         </Fragment>
    
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired
};

export default connect(null, { setAlert, register })(Register);
