import { useState } from "react";
import { Sidebar, Topbar } from "./components/chrome";
import type { PageKey } from "./components/navigation";
import BookingModal, {
  type BookingKind,
  type ClinicDraft,
  type GroomDraft,
} from "./components/BookingModal";
import {
  appointments as seedClinic,
  groomingAgenda as seedGrooming,
  type Appointment,
  type AppointmentStatus,
  type GroomAppointment,
  type GroomStatus,
} from "./data/mock";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import Patients from "./pages/Patients";
import Vaccines from "./pages/Vaccines";
import Hospital from "./pages/Hospital";
import Pos from "./pages/Pos";
import Grooming from "./pages/Grooming";
import Finance from "./pages/Finance";
import Reports from "./pages/Reports";
import Marketing from "./pages/Marketing";
import { Clients, Inventory } from "./pages/Clinic";

const META: Record<PageKey, { title: string; subtitle: string }> = {
  dashboard: { title: "Central de comando", subtitle: "Clínica · Hospital · Pet Shop · Banho & Tosa — sáb, 10 out 2026." },
  appointments: { title: "Consultas", subtitle: "Módulo 1 · Agenda de hoje · 2 salas + fisio." },
  patients: { title: "Pacientes e prontuários", subtitle: "Módulo 1 · Fichas, histórico e documentos." },
  vaccines: { title: "Vacinas", subtitle: "Módulo 1 · Protocolos, radar e lembretes automáticos." },
  hospital: { title: "Internação", subtitle: "Módulo 2 · Leitos, sinais vitais, prescrições e plantão." },
  pos: { title: "Ponto de venda", subtitle: "Módulo 3 · Caixa rápido, vendas unificadas, nota fiscal sozinha." },
  inventory: { title: "Estoque", subtitle: "Módulo 3 · Reposição inteligente, validade e consumo interno." },
  grooming: { title: "Banho & tosa", subtitle: "Módulo 4 · Fila por profissional, pacotes e check-lists." },
  finance: { title: "Financeiro", subtitle: "Incluso · Fluxo de caixa, recebíveis e faturas." },
  reports: { title: "Relatórios e inteligência", subtitle: "Incluso · Receita, equipe e visão do estoque." },
  marketing: { title: "Marketing e CRM", subtitle: "Incluso · Automação de WhatsApp, NPS e campanhas." },
  clients: { title: "Tutores", subtitle: "Contatos e pets vinculados em todos os módulos." },
};

export default function App() {
  const [page, setPage] = useState<PageKey>("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  // Agendas compartilhadas pra o botão da barra e as páginas caírem no mesmo lugar
  const [clinic, setClinic] = useState<Appointment[]>(seedClinic);
  const [grooming, setGrooming] = useState<GroomAppointment[]>(seedGrooming);
  const [booking, setBooking] = useState<BookingKind | null>(null);

  const setClinicStatus = (id: string, status: AppointmentStatus) =>
    setClinic((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));

  const advanceGrooming = (id: string) =>
    setGrooming((prev) =>
      prev.map((g) => {
        const next: GroomStatus | null =
          g.status === "Na fila" ? "Em atendimento" : g.status === "Em atendimento" ? "Concluído" : null;
        return g.id === id && next ? { ...g, status: next } : g;
      }),
    );

  const bookClinic = (d: ClinicDraft) => {
    setClinic((prev) => [
      ...prev,
      {
        id: `AP-${String(prev.length + 1).padStart(2, "0")}`,
        time: d.time,
        pet: d.pet.trim(),
        species: "Cão",
        owner: d.owner.trim(),
        vet: d.vet,
        reason: d.reason.trim() || "Consulta geral",
        type: "Consulta",
        status: "Agendado",
        room: "Sala 1",
      },
    ]);
    setBooking(null);
    setPage("appointments");
  };

  const bookGrooming = (d: GroomDraft) => {
    setGrooming((prev) => [
      ...prev,
      {
        id: `G-${String(prev.length + 1).padStart(2, "0")}`,
        time: d.time,
        pet: d.pet.trim(),
        breed: "—",
        owner: d.owner.trim(),
        service: d.service as GroomAppointment["service"],
        groomer: d.groomer,
        status: "Na fila",
        notes: d.notes.trim() || "Sem observações.",
      },
    ]);
    setBooking(null);
    setPage("grooming");
  };

  return (
    <div className="flex min-h-screen bg-sand-50">
      <Sidebar active={page} onNavigate={setPage} open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          title={META[page].title}
          subtitle={META[page].subtitle}
          onMenu={() => setMenuOpen(true)}
          query={query}
          onQuery={setQuery}
          onQuickAdd={() => setBooking(page === "grooming" ? "grooming" : "clinic")}
        />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-4 sm:px-6 sm:py-6">
          {page === "dashboard" && <Dashboard query={query} onOpen={setPage} clinic={clinic} grooming={grooming} />}
          {page === "appointments" && (
            <Appointments query={query} appts={clinic} onStatus={setClinicStatus} onNew={() => setBooking("clinic")} />
          )}
          {page === "patients" && <Patients query={query} />}
          {page === "vaccines" && <Vaccines query={query} />}
          {page === "hospital" && <Hospital query={query} />}
          {page === "pos" && <Pos query={query} />}
          {page === "inventory" && <Inventory query={query} />}
          {page === "grooming" && (
            <Grooming query={query} agenda={grooming} onAdvance={advanceGrooming} onNew={() => setBooking("grooming")} />
          )}
          {page === "finance" && <Finance query={query} />}
          {page === "reports" && <Reports />}
          {page === "marketing" && <Marketing />}
          {page === "clients" && <Clients query={query} />}
        </main>
        <footer className="px-6 pb-5 text-xs text-stone-400">
          MatraVet · os 4 módulos num sistema só — tela demonstrativa com dados locais.
        </footer>
      </div>

      {booking && (
        <BookingModal
          kind={booking}
          onTab={setBooking}
          onClose={() => setBooking(null)}
          onBookClinic={bookClinic}
          onBookGrooming={bookGrooming}
        />
      )}
    </div>
  );
}
