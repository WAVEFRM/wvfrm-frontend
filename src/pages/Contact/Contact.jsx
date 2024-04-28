import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './Contact.css'; 
import Footer from '../../components/Footer/Footer';

const Contact = () => {
    return (
        <div>
            <Navbar /> {/* Render the Navbar component */}
            <main>
                <section className="section-contact">
                    <div className="container">
                        <h1>Contact the team!</h1>
                        <p>Fill out the form below to get in touch with one of our team members. We will try to get back to you within 48 hours. If we do not reply within that time please feel free to use the form again.</p>

                        <form action="https://api.web3forms.com/submit" method="POST" id="form">
                            <input type="hidden" name="access_key" value="a2303a56-c75e-4f0c-8454-d0724ebdb330" />
                            <input type="checkbox" name="botcheck" id="" style={{ display: 'none' }} />
                            <div className="form-group">
                                <label htmlFor="firstname">First name*</label>
                                <input
                                    autoComplete="off"
                                    type="text"
                                    name="firstname"
                                    id="firstname"
                                    required
                                    className="form-element"
                                    placeholder="John" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastname">Last name*</label>
                                <input
                                    autoComplete="off"
                                    type="text"
                                    name="lastname"
                                    id="lastname"
                                    required
                                    className="form-element"
                                    placeholder="Doe" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email address*</label>
                                <input
                                    autoComplete="off"
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    className="form-element"
                                    placeholder="john.doe@example.com" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="company">Company</label>
                                <input
                                    autoComplete="off"
                                    type="text"
                                    name="company"
                                    id="company"
                                    className="form-element"
                                    placeholder="Enter your company name" />
                            </div>
                            <div className="form-group full">
                                <label htmlFor="message">What are you looking for?</label>
                                <textarea
                                    name="message"
                                    id="message"
                                    className="form-element"
                                    placeholder="I want a website please..."></textarea>
                            </div>
                            <div className="submit-group">
                                <input type="submit" value="SEND MESSAGE" />
                            </div>
                        </form>
                    </div>
                </section>
            </main>
            <script src="../static/js/navbar.js"></script>
            <Footer/>
        </div>
    );
};

export default Contact;
