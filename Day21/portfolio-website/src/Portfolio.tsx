// Portfolio.jsx
// Extended portfolio website with detailed project view and extra features.
// Uses Bootstrap for layout.

import { useState } from 'react';

export default function Portfolio() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      title: 'Smart Fertilizer Optimizer',
      desc: 'Analyzed soil data and delivered tailored fertilizer recommendations for higher yield (SIH project).',
      tech: ['Python', 'Pandas', 'LightGBM', 'FastAPI'],
      details: 'Built a machine learning model trained on soil nutrient datasets to recommend optimal fertilizer use. Integrated with FastAPI to deliver predictions to farmers in real-time. Achieved improved crop yield and reduced costs.',
      link: '#'
    },
    {
      title: 'College Chatbot',
      desc: 'Website chatbot for college FAQs, powered by NLP and rule-based fallback.',
      tech: ['React', 'FastAPI', 'spaCy'],
      details: 'Developed a chatbot that answers admission, fee, and course queries. Implemented dynamic menus and integrated NLP using spaCy for entity recognition. Provided fallback responses with authentic resources.',
      link: '#'
    },
    {
      title: 'Fraud Detection Engine',
      desc: 'Real-time transaction fraud detection using feature engineering and ML models.',
      tech: ['Scikit-learn', 'XGBoost', 'Docker'],
      details: 'Processed large-scale transaction data to detect anomalies. Engineered features such as velocity, geolocation mismatch, and spending pattern deviations. Deployed model in Docker for scalability and real-time predictions.',
      link: '#'
    }
  ];

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('Send contact', form);
    setSent(true);
    setTimeout(() => setSent(false), 5000);
    setForm({ name: '', email: '', message: '' });
  }

  return (
    <div className="container py-5">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm mb-5">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold" href="#">YourName</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navMenu">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
              <li className="nav-item"><a className="nav-link" href="#projects">Projects</a></li>
              <li className="nav-item"><a className="nav-link" href="#experience">Experience</a></li>
              <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="row align-items-center mb-5">
        <div className="col-lg-7">
          <h1 className="display-5">Hi — I’m <span className="text-primary">Your Name</span></h1>
          <p className="lead">A developer focused on building practical ML & web solutions that solve real problems. I work with Python, React, and scalable APIs.</p>
          <div className="mt-4">
            <a href="#projects" className="btn btn-primary me-2">See Projects</a>
            <a href="#contact" className="btn btn-outline-secondary">Contact Me</a>
          </div>
        </div>
        <div className="col-lg-5 text-center">
          <img src="https://via.placeholder.com/220" alt="profile" className="rounded-circle img-fluid shadow" style={{ maxWidth: 220 }} />
        </div>
      </header>

      {/* About */}
      <section id="about" className="mb-5">
        <h2>About Me</h2>
        <p>I’m a developer and data scientist who loves turning messy data into useful products. I’ve built projects on spam classification, fraud detection, and farmer-focused ML solutions. I enjoy mentoring new devs and making clean, maintainable code.</p>
      </section>

      {/* Experience */}
      <section id="experience" className="mb-5">
        <h2>Experience</h2>
        <div className="timeline">
          <div className="mb-4">
            <h5>Software Developer Intern — XYZ Corp</h5>
            <p className="small text-muted">Jan 2024 – Apr 2024</p>
            <p>Worked on building REST APIs and integrating machine learning models into production systems. Contributed to code reviews and improved team workflows.</p>
          </div>
          <div className="mb-4">
            <h5>AI Research Project — University</h5>
            <p className="small text-muted">2023</p>
            <p>Explored natural language processing techniques for text summarization and spam detection. Published project on GitHub with documentation.</p>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="mb-5">
        <h2 className="mb-4">Selected Projects</h2>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {projects.map((p, i) => (
            <div className="col" key={i}>
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{p.title}</h5>
                  <p className="card-text">{p.desc}</p>
                  <div className="mt-auto">
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => setSelectedProject(p)}>Details</button>
                    <a href={p.link} className="btn btn-sm btn-link">View Project</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for project details */}
        {selectedProject && (
          <div className="modal fade show d-block" tabIndex='2'>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{selectedProject.title}</h5>
                  <button type="button" className="btn-close" onClick={() => setSelectedProject(null)}></button>
                </div>
                <div className="modal-body">
                  <p>{selectedProject.details}</p>
                  <p><strong>Technologies:</strong> {selectedProject.tech.join(', ')}</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setSelectedProject(null)}>Close</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Contact */}
      <section id="contact" className="mb-5">
        <h2 className="mb-4">Contact</h2>
        <div className="row">
          <div className="col-lg-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input name="name" value={form.name} onChange={handleChange} required className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea name="message" value={form.message} onChange={handleChange} required rows={5} className="form-control" />
              </div>
              <button className="btn btn-primary" type="submit">Send Message</button>
              {sent && <div className="alert alert-success mt-3">Message sent (demo)</div>}
            </form>
          </div>
          <div className="col-lg-6">
            <h5>Other ways to reach me</h5>
            <p>LinkedIn: <a href="#">your-linkedin</a></p>
            <p>GitHub: <a href="#">github.com/yourname</a></p>
            <p>Resume: <a href="#">Download</a></p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-4 border-top">
        <div className="d-flex justify-content-between align-items-center">
          <small>© {new Date().getFullYear()} Your Name</small>
          <div>
            <a className="me-3" href="#">Twitter</a>
            <a href="#">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
