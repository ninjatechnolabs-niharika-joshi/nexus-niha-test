import { motion } from 'framer-motion'
import AnimatedSection from '../components/ui/AnimatedSection'
import './About.css'

const team = [
  { id: 1, name: 'Alexandra Morgan', role: 'Founder & CEO', bio: '20 years in travel industry. Visited 75 countries and counting.', img: 'https://picsum.photos/seed/team1/400/400' },
  { id: 2, name: 'James Nakamura', role: 'Head of Destinations', bio: 'Former Lonely Planet editor with deep expertise in Asian travel.', img: 'https://picsum.photos/seed/team2/400/400' },
  { id: 3, name: 'Sofia Rodriguez', role: 'Customer Experience', bio: 'Passionate about creating perfect, personalized travel experiences.', img: 'https://picsum.photos/seed/team3/400/400' },
  { id: 4, name: 'Marcus Anderson', role: 'Adventure Guide Lead', bio: 'Certified mountain guide and extreme sports enthusiast.', img: 'https://picsum.photos/seed/team4/400/400' },
  { id: 5, name: 'Priya Patel', role: 'Sustainability Director', bio: 'PhD in Environmental Science, driving our eco-travel initiatives.', img: 'https://picsum.photos/seed/team5/400/400' },
  { id: 6, name: 'Luke Chen', role: 'Technology Lead', bio: 'Building the digital tools that make travel planning seamless.', img: 'https://picsum.photos/seed/team6/400/400' },
]

const timeline = [
  { year: '2010', title: 'WanderLust Founded', desc: 'Alexandra Morgan started WanderLust from a small office in New York with a vision to make travel accessible to everyone.', side: 'left' },
  { year: '2012', title: 'First International Expansion', desc: 'Opened offices in London and Paris, bringing European destinations to our growing customer base.', side: 'right' },
  { year: '2015', title: '1,000th Happy Customer', desc: 'Celebrated our 1,000th satisfied traveler — a milestone that marked our growing reputation for excellence.', side: 'left' },
  { year: '2017', title: 'Sustainability Pledge', desc: 'Launched our Green Travel initiative, committing to carbon-neutral operations and supporting local communities.', side: 'right' },
  { year: '2019', title: 'Best Travel Agency Award', desc: 'Named "Best Independent Travel Agency" by Travel+Leisure Magazine for the second consecutive year.', side: 'left' },
  { year: '2022', title: 'Digital Transformation', desc: 'Launched our new booking platform and AI-powered destination matching system.', side: 'right' },
  { year: '2024', title: '10,000 Travelers Milestone', desc: 'Proudly serving over 10,000 travelers with a 98% satisfaction rate and operations in 50+ countries.', side: 'left' },
]

const awards = [
  { icon: '🏆', title: 'Best Travel Agency', org: 'Travel+Leisure', year: '2023' },
  { icon: '🌱', title: 'Sustainable Tourism Award', org: 'Green Tourism Council', year: '2023' },
  { icon: '⭐', title: 'Excellence in Service', org: 'TripAdvisor', year: '2022' },
  { icon: '🎖️', title: 'Top Luxury Operator', org: 'Conde Nast', year: '2022' },
  { icon: '🌍', title: 'Best Global Reach', org: 'World Travel Awards', year: '2021' },
  { icon: '💎', title: 'Customer Choice Award', org: 'Forbes Travel', year: '2023' },
]

export default function About() {
  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero" aria-label="About WanderLust">
        <div className="container">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            Our Story
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
            Born from a passion for exploration, WanderLust has been turning travel dreams into reality since 2010.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="about-story">
        <div className="container">
          <div className="about-story-grid">
            <AnimatedSection variant="fadeLeft">
              <div className="about-story-text">
                <h2>From Dream to Destination</h2>
                <p>
                  WanderLust was born in 2010 when our founder Alexandra Morgan returned from a transformative solo journey across Southeast Asia. She realized that travel had the power to change perspectives, forge connections, and create memories that last a lifetime.
                </p>
                <p>
                  Starting with just three destinations and a handful of passionate travelers, we've grown into one of the world's most trusted travel companies — but our mission has never changed: to help you discover the world in the most meaningful way possible.
                </p>
                <p>
                  Today, we serve over 10,000 travelers annually across 50+ destinations, with a team of 120 travel experts who share one thing in common: an insatiable love of exploration.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection variant="fadeRight">
              <div className="about-story-image">
                <img
                  src="https://picsum.photos/seed/about-story/800/600"
                  alt="WanderLust team planning travel experiences"
                />
                <div className="about-gif-badge">
                  <img
                    src="https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif"
                    alt="Excited traveler celebrating"
                  />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision" aria-labelledby="mv-heading">
        <div className="container">
          <AnimatedSection variant="fadeUp" className="section-header">
            <h2 id="mv-heading">Mission & Vision</h2>
          </AnimatedSection>
          <div className="mv-grid">
            <AnimatedSection variant="fadeLeft">
              <div className="mv-card mission">
                <div className="mv-icon" aria-hidden="true">🎯</div>
                <h3>Our Mission</h3>
                <p>
                  To inspire people to explore the world, creating transformative travel experiences that respect local cultures, protect natural environments, and forge genuine human connections.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection variant="fadeRight">
              <div className="mv-card vision">
                <div className="mv-icon" aria-hidden="true">🔭</div>
                <h3>Our Vision</h3>
                <p>
                  A world where travel bridges cultural divides, sustains local economies, and creates a global community of curious, empathetic, and open-minded explorers.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="about-team" aria-labelledby="team-heading">
        <div className="container">
          <AnimatedSection variant="fadeUp" className="section-header">
            <h2 id="team-heading">Meet Our Team</h2>
            <p>The passionate people behind your perfect travels</p>
          </AnimatedSection>
          <div className="team-grid">
            {team.map((member, i) => (
              <AnimatedSection key={member.id} variant="fadeUp" delay={i * 0.1}>
                <div className="team-card">
                  <div className="team-card-image">
                    <img src={member.img} alt={`${member.name}, ${member.role}`} loading="lazy" />
                    <div className="team-card-overlay" aria-hidden="true">
                      <div className="team-social-links">
                        <a href="#" className="team-social-link" aria-label={`${member.name}'s LinkedIn`}>in</a>
                        <a href="#" className="team-social-link" aria-label={`${member.name}'s Twitter`}>𝕏</a>
                      </div>
                    </div>
                  </div>
                  <div className="team-card-body">
                    <div className="team-card-name">{member.name}</div>
                    <div className="team-card-role">{member.role}</div>
                    <p className="team-card-bio">{member.bio}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="about-timeline" aria-labelledby="timeline-heading">
        <div className="container">
          <AnimatedSection variant="fadeUp" className="section-header">
            <h2 id="timeline-heading">Our Journey</h2>
            <p>From humble beginnings to global impact</p>
          </AnimatedSection>
          <div className="timeline" role="list">
            {timeline.map((item, i) => (
              <AnimatedSection key={item.year} variant={item.side === 'left' ? 'fadeLeft' : 'fadeRight'} delay={i * 0.1}>
                <div className={`timeline-item ${item.side}`} role="listitem">
                  {item.side === 'left' && (
                    <div className="timeline-content">
                      <div className="timeline-year">{item.year}</div>
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  )}
                  <div className="timeline-dot" aria-hidden="true">{item.year.slice(2)}</div>
                  {item.side === 'right' && (
                    <div className="timeline-content">
                      <div className="timeline-year">{item.year}</div>
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="about-awards" aria-labelledby="awards-heading">
        <div className="container">
          <AnimatedSection variant="fadeUp" className="section-header">
            <h2 id="awards-heading">Awards & Recognition</h2>
            <p>Industry recognition for our commitment to excellence</p>
          </AnimatedSection>
          <div className="awards-grid">
            {awards.map((award, i) => (
              <AnimatedSection key={award.title} variant="scale" delay={i * 0.08}>
                <motion.div className="award-card" whileHover={{ y: -4 }}>
                  <div className="award-icon" aria-hidden="true">{award.icon}</div>
                  <div className="award-title">{award.title}</div>
                  <div className="award-org">{award.org}</div>
                  <div className="award-year">{award.year}</div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
