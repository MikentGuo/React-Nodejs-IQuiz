import React from 'react'

export default function Contact() {
    return (
        <main id="main">
            <div className="breadcrumbs" data-aos="fade-in">
            <div className="container">
                <h2>Contact Us</h2>
            </div>
            </div>
    
        <section id="contact" className="contact">
          <div className="container" data-aos="fade-up">
    
            <div className="row mt-5">
    
              <div className="col-lg-4">
                <div className="info">
                  <div className="address">
                    <i className="bi bi-geo-alt"></i>
                    <h4>Location:</h4>
                    <p>123 Abc Street, Montreal, QC H3W 1A1</p>
                  </div>
    
                  <div className="email">
                    <i className="bi bi-envelope"></i>
                    <h4>Email:</h4>
                    <p>fsd01.umentor@gmail.com</p>
                  </div>
    
                  <div className="phone">
                    <i className="bi bi-phone"></i>
                    <h4>Call:</h4>
                    <p>+1 123 4567 890</p>
                  </div>
    
                </div>
    
              </div>
    
              <div className="col-lg-8 mt-5 mt-lg-0">
    
                <form className="php-email-form">
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <input type="text" field="*{fullName}"className="form-control" id="name" placeholder="Your Name" required />
                    </div>
                    <div className="col-md-6 form-group mt-3 mt-md-0">
                      <input type="email" className="form-control" field="*{email}" id="email" placeholder="Your Email" required />
                    </div>
                  </div>
                  <div className="form-group mt-3">
                    <input type="text" className="form-control" field="*{subject}" id="subject" placeholder="Subject" required />
                  </div>
                  <div className="form-group mt-3">
                    <textarea className="form-control" field="*{body}" rows="5" placeholder="Message" required></textarea>
                  </div>
                  <div className="text-center"><button type="submit">Send Message</button></div>
                </form>
    
              </div>
    
            </div>
    
          </div>
        </section>
    
      </main>
    
    )
}
