"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

export default function AdminPage() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function login(e) {
    e.preventDefault();
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Email o contraseña incorrectos.");
    }
  }

  async function logout() {
    await supabase.auth.signOut();
  }

  if (loading) {
    return <main style={styles.center}>Cargando...</main>;
  }

  if (!session) {
    return (
      <main style={styles.loginPage}>
        <form style={styles.loginBox} onSubmit={login}>
          <div style={styles.logo}>BACKOFF</div>

          <h1 style={styles.loginTitle}>Administrador</h1>

          <p style={styles.loginText}>
            Ingresá con tu usuario de administración.
          </p>

          <label style={styles.label}>Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />

          <label style={styles.label}>Contraseña</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.loginButton}>
            Entrar
          </button>
        </form>
      </main>
    );
  }

  return (
    <div style={styles.layout}>
      <aside style={styles.sidebar}>
        <div>
          <div style={styles.sidebarLogo}>BACKOFF ADMIN</div>

          <nav style={styles.nav}>
            <button style={styles.navActive}>Dashboard</button>
            <button style={styles.navButton}>Productos</button>
            <button style={styles.navButton}>Stock</button>
            <button style={styles.navButton}>Pedidos</button>
            <button style={styles.navButton}>Configuración</button>
          </nav>
        </div>

        <button onClick={logout} style={styles.logout}>
          Cerrar sesión
        </button>
      </aside>

      <main style={styles.main}>
        <div style={styles.topbar}>
          <div>
            <p style={styles.small}>BACKOFF</p>
            <h1 style={styles.title}>Dashboard</h1>
          </div>

          <span style={styles.status}>Administrador</span>
        </div>

        <div style={styles.cards}>
          <div style={styles.card}>
            <span style={styles.cardLabel}>Productos</span>
            <strong style={styles.cardNumber}>3</strong>
          </div>

          <div style={styles.card}>
            <span style={styles.cardLabel}>Pedidos pendientes</span>
            <strong style={styles.cardNumber}>0</strong>
          </div>

          <div style={styles.card}>
            <span style={styles.cardLabel}>Ventas</span>
            <strong style={styles.cardNumber}>$0</strong>
          </div>
        </div>

        <div style={styles.panel}>
          <h2>Administrador conectado</h2>

          <p style={styles.panelText}>
            El login privado ya está preparado. El próximo paso será leer y
            editar productos desde Supabase.
          </p>
        </div>
      </main>
    </div>
  );
}

const styles = {
  center: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
  },

  loginPage: {
    minHeight: "100vh",
    background: "#171717",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },

  loginBox: {
    width: "100%",
    maxWidth: "420px",
    background: "#f7f5f0",
    padding: "40px",
  },

  logo: {
    fontSize: "28px",
    fontWeight: "900",
    marginBottom: "50px",
  },

  loginTitle: {
    fontSize: "36px",
    marginBottom: "10px",
  },

  loginText: {
    color: "#666",
    marginBottom: "30px",
  },

  label: {
    display: "block",
    fontSize: "13px",
    fontWeight: "700",
    marginBottom: "8px",
  },

  input: {
    width: "100%",
    padding: "14px",
    border: "1px solid #ccc",
    marginBottom: "20px",
    fontSize: "16px",
  },

  error: {
    color: "#a00000",
    fontSize: "13px",
    marginBottom: "20px",
  },

  loginButton: {
    width: "100%",
    padding: "15px",
    border: "none",
    background: "#171717",
    color: "white",
    fontWeight: "800",
    cursor: "pointer",
  },

  layout: {
    minHeight: "100vh",
    display: "grid",
    gridTemplateColumns: "240px 1fr",
    fontFamily: "Arial, sans-serif",
    background: "#f4f4f2",
  },

  sidebar: {
    background: "#171717",
    color: "white",
    padding: "30px 20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  sidebarLogo: {
    fontSize: "24px",
    fontWeight: "900",
    marginBottom: "40px",
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  navButton: {
    background: "transparent",
    border: "none",
    color: "#aaa",
    textAlign: "left",
    padding: "12px",
  },

  navActive: {
    background: "#2d2d2d",
    border: "none",
    color: "white",
    textAlign: "left",
    padding: "12px",
  },

  logout: {
    background: "transparent",
    border: "1px solid #444",
    color: "white",
    padding: "11px",
    cursor: "pointer",
  },

  main: {
    padding: "40px",
  },

  topbar: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "35px",
  },

  small: {
    fontSize: "11px",
    fontWeight: "800",
    letterSpacing: "2px",
  },

  title: {
    fontSize: "36px",
    marginTop: "6px",
  },

  status: {
    height: "fit-content",
    background: "#e5e5e0",
    padding: "8px 12px",
    borderRadius: "50px",
    fontSize: "12px",
  },

  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "15px",
    marginBottom: "25px",
  },

  card: {
    background: "white",
    border: "1px solid #ddd",
    padding: "25px",
  },

  cardLabel: {
    display: "block",
    color: "#777",
    fontSize: "12px",
    marginBottom: "10px",
  },

  cardNumber: {
    fontSize: "32px",
  },

  panel: {
    background: "white",
    border: "1px solid #ddd",
    padding: "30px",
  },

  panelText: {
    marginTop: "10px",
    color: "#666",
    lineHeight: "1.5",
  },
};
