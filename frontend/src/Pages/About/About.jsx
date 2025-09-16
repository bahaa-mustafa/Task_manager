import style from "./About.module.css";

function About() {
  return (
    <section className={style.about}>
      <div className={style.container}>
        <h1 className={style.title}>About Task Manager</h1>
        <p className={style.subtitle}>
          Task Manager is a simple and powerful tool to help you stay organized,
          boost productivity, and keep track of your daily tasks seamlessly.
        </p>

        <div className={style.cards}>
          <div className={style.card}>
            <h3>🚀 Productivity</h3>
            <p>Stay on top of your tasks and manage your time efficiently.</p>
          </div>
          <div className={style.card}>
            <h3>📅 Task Scheduling</h3>
            <p>Plan your work ahead and never miss a deadline again.</p>
          </div>
          <div className={style.card}>
            <h3>✅ Easy to Use</h3>
            <p>Enjoy a clean and intuitive interface designed for everyone.</p>
          </div>
        </div>

        <footer className={style.footer}>
          <p>Made with ❤️ by Bahaa | 2025</p>
        </footer>
      </div>
    </section>
  );
}

export default About;
