// Configuración de NextAuth (v4) para Bajo Tigui.
// POR IMPLEMENTAR: validar credenciales contra la BD (usuarios, password_hash con bcrypt/argon2).
// Roles: asociado, soporte, admin. Necesita NEXTAUTH_SECRET y SUPABASE_*.
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credenciales",
      credentials: {
        email: { label: "Correo", type: "text" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        if (!supabase) return null;
        const { data: user, error } = await supabase
          .from("usuarios")
          .select("id, email, password_hash, activo, roles(nombre)")
          .eq("email", credentials.email)
          .single();
        if (error || !user || !user.activo) return null;
        const bcrypt = await import("bcryptjs");
        const ok = await bcrypt.compare(credentials.password, user.password_hash);
        if (!ok) return null;
        return { id: user.id, email: user.email, role: (user.roles as { nombre?: string } | null)?.nombre };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) (token as { role?: string }).role = (user as { role?: string }).role;
      return token;
    },
    async session({ session, token }) {
      if (session.user) (session.user as { role?: string }).role = (token as { role?: string }).role;
      return session;
    },
  },
  pages: { signIn: "/portal" },
  secret: process.env.NEXTAUTH_SECRET,
};
