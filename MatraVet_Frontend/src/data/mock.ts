export type Species = "Cão" | "Gato" | "Ave" | "Coelho" | "Réptil" | "Outro";

export type AppointmentStatus = "Agendado" | "Em atendimento" | "Concluído" | "Cancelado" | "Urgente";

export type InvoiceStatus = "Pago" | "Pendente" | "Em atraso";

export interface Owner {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  pets: number;
  since: string;
}

export interface Patient {
  id: string;
  name: string;
  species: Species;
  breed: string;
  age: string;
  weight: string;
  gender: "Macho" | "Fêmea";
  owner: string;
  ownerId: string;
  phone: string;
  status: "Saudável" | "Em tratamento" | "Crítico" | "Em recuperação";
  lastVisit: string;
  nextVisit: string;
  vaccineUpToDate: boolean;
  avatarColor: string;
  notes: string;
}

export interface Appointment {
  id: string;
  time: string;
  pet: string;
  species: Species;
  owner: string;
  vet: string;
  reason: string;
  type: "Consulta" | "Vacinação" | "Cirurgia" | "Emergência" | "Tosa" | "Odontológico";
  status: AppointmentStatus;
  room: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: "Vacina" | "Medicamento" | "Alimentação" | "Cirúrgico" | "Higiene";
  stock: number;
  minStock: number;
  unit: string;
  price: string;
  supplier: string;
  expiry: string;
}

export interface Invoice {
  id: string;
  client: string;
  pet: string;
  service: string;
  date: string;
  amount: string;
  status: InvoiceStatus;
}

export interface MedRecord {
  date: string;
  title: string;
  vet: string;
  details: string;
}

export const vets = ["Dra. Marina Costa", "Dr. Rafael Lima", "Dra. Ana Beatriz", "Dr. Thiago Nunes"];

export const owners: Owner[] = [
  { id: "OW-101", name: "Camila Rocha", phone: "(11) 98812-4430", email: "camila.rocha@mail.com", address: "Rua das Flores, 210 — São Paulo", pets: 2, since: "2022" },
  { id: "OW-102", name: "João Pedro M.", phone: "(11) 97654-2210", email: "joaopm@mail.com", address: "Av. Paulista, 1040 — São Paulo", pets: 1, since: "2023" },
  { id: "OW-103", name: "Fernanda Alves", phone: "(11) 99123-8890", email: "nanda.alves@mail.com", address: "Rua Vergueiro, 330 — São Paulo", pets: 3, since: "2021" },
  { id: "OW-104", name: "Lucas Ferreira", phone: "(11) 98543-1122", email: "lucas.f@mail.com", address: "Rua Bela Vista, 77 — São Paulo", pets: 1, since: "2024" },
  { id: "OW-105", name: "Patrícia Gomes", phone: "(11) 99234-5566", email: "pat.gomes@mail.com", address: "Alameda Santos, 900 — São Paulo", pets: 2, since: "2022" },
  { id: "OW-106", name: "Diego Santos", phone: "(11) 98765-3344", email: "diego.s@mail.com", address: "Rua Augusta, 512 — São Paulo", pets: 1, since: "2023" },
];

export const patients: Patient[] = [
  { id: "PT-001", name: "Thor", species: "Cão", breed: "Golden Retriever", age: "3a 2m", weight: "32 kg", gender: "Macho", owner: "Camila Rocha", ownerId: "OW-101", phone: "(11) 98812-4430", status: "Saudável", lastVisit: "28 set 2026", nextVisit: "14 out 2026", vaccineUpToDate: true, avatarColor: "bg-amber-500", notes: "Muito dócil. Alergia alimentar leve — ração hipoalergênica." },
  { id: "PT-002", name: "Mia", species: "Gato", breed: "Siamês", age: "2a 6m", weight: "4,1 kg", gender: "Fêmea", owner: "João Pedro M.", ownerId: "OW-102", phone: "(11) 97654-2210", status: "Em tratamento", lastVisit: "8 out 2026", nextVisit: "11 out 2026", vaccineUpToDate: true, avatarColor: "bg-violet-500", notes: "Tratamento urinário em andamento. Repetir exame de pH na próxima visita." },
  { id: "PT-003", name: "Bolt", species: "Cão", breed: "Border Collie", age: "5a 1m", weight: "21 kg", gender: "Macho", owner: "Fernanda Alves", ownerId: "OW-103", phone: "(11) 99123-8890", status: "Em recuperação", lastVisit: "2 out 2026", nextVisit: "16 out 2026", vaccineUpToDate: true, avatarColor: "bg-sky-500", notes: "Recuperação de cirurgia de LCA. Repouso com restrição por mais 3 semanas." },
  { id: "PT-004", name: "Luna", species: "Gato", breed: "Persa", age: "4a", weight: "3,8 kg", gender: "Fêmea", owner: "Patrícia Gomes", ownerId: "OW-105", phone: "(11) 99234-5566", status: "Saudável", lastVisit: "20 set 2026", nextVisit: "2 nov 2026", vaccineUpToDate: false, avatarColor: "bg-pink-500", notes: "Reforço da antirrábica atrasado — tutora avisada pelo WhatsApp." },
  { id: "PT-005", name: "Rocky", species: "Cão", breed: "Bulldog Francês", age: "1a 8m", weight: "12,5 kg", gender: "Macho", owner: "Lucas Ferreira", ownerId: "OW-104", phone: "(11) 98543-1122", status: "Crítico", lastVisit: "10 out 2026", nextVisit: "11 out 2026", vaccineUpToDate: false, avatarColor: "bg-red-500", notes: "Episódio de desconforto respiratório. Em observação na Sala 2." },
  { id: "PT-006", name: "Kiwi", species: "Ave", breed: "Calopsita", age: "2a", weight: "95 g", gender: "Fêmea", owner: "Diego Santos", ownerId: "OW-106", phone: "(11) 98765-3344", status: "Saudável", lastVisit: "15 set 2026", nextVisit: "1 dez 2026", vaccineUpToDate: true, avatarColor: "bg-emerald-500", notes: "Desgaste de bico feito. Recomendado suplemento vitamínico." },
  { id: "PT-007", name: "Nina", species: "Coelho", breed: "Netherland Dwarf", age: "1a 3m", weight: "1,2 kg", gender: "Fêmea", owner: "Fernanda Alves", ownerId: "OW-103", phone: "(11) 99123-8890", status: "Em tratamento", lastVisit: "6 out 2026", nextVisit: "13 out 2026", vaccineUpToDate: true, avatarColor: "bg-orange-400", notes: "Desgaste dentário feito. Ração pastosa por 7 dias." },
  { id: "PT-008", name: "Simba", species: "Gato", breed: "Maine Coon", age: "6a", weight: "7,2 kg", gender: "Macho", owner: "Camila Rocha", ownerId: "OW-101", phone: "(11) 98812-4430", status: "Saudável", lastVisit: "30 set 2026", nextVisit: "20 out 2026", vaccineUpToDate: true, avatarColor: "bg-indigo-500", notes: "Plano de controle de peso. Perdeu 400g desde agosto." },
];

export const appointments: Appointment[] = [
  { id: "AP-01", time: "08:00", pet: "Rocky", species: "Cão", owner: "Lucas Ferreira", vet: "Dra. Marina Costa", reason: "Retorno respiratório", type: "Emergência", status: "Urgente", room: "Sala 2" },
  { id: "AP-02", time: "08:45", pet: "Mia", species: "Gato", owner: "João Pedro M.", vet: "Dr. Rafael Lima", reason: "Recheck urinário + exame de urina", type: "Consulta", status: "Em atendimento", room: "Sala 1" },
  { id: "AP-03", time: "09:30", pet: "Thor", species: "Cão", owner: "Camila Rocha", vet: "Dra. Ana Beatriz", reason: "Vacinas anuais (V8 + antirrábica)", type: "Vacinação", status: "Agendado", room: "Sala 3" },
  { id: "AP-04", time: "10:15", pet: "Nina", species: "Coelho", owner: "Fernanda Alves", vet: "Dra. Marina Costa", reason: "Retorno pós-odontológico", type: "Consulta", status: "Agendado", room: "Sala 1" },
  { id: "AP-05", time: "11:00", pet: "Bolt", species: "Cão", owner: "Fernanda Alves", vet: "Dr. Thiago Nunes", reason: "Sessão de fisioterapia", type: "Consulta", status: "Agendado", room: "Fisio" },
  { id: "AP-06", time: "13:30", pet: "Luna", species: "Gato", owner: "Patrícia Gomes", vet: "Dr. Rafael Lima", reason: "Reforço da antirrábica (atrasada)", type: "Vacinação", status: "Agendado", room: "Sala 3" },
  { id: "AP-07", time: "14:15", pet: "Simba", species: "Gato", owner: "Camila Rocha", vet: "Dra. Ana Beatriz", reason: "Controle de peso + revisão da dieta", type: "Consulta", status: "Concluído", room: "Sala 2" },
  { id: "AP-08", time: "15:00", pet: "Max (novo)", species: "Cão", owner: "Particular", vet: "Dr. Thiago Nunes", reason: "Primeira consulta", type: "Consulta", status: "Agendado", room: "Sala 1" },
];

export const inventory: InventoryItem[] = [
  { id: "IN-01", name: "Vacina antirrábica (Defensor)", category: "Vacina", stock: 24, minStock: 10, unit: "doses", price: "R$ 45", supplier: "Zoetis", expiry: "mar/2027" },
  { id: "IN-02", name: "Vacina polivalente V8", category: "Vacina", stock: 8, minStock: 12, unit: "doses", price: "R$ 68", supplier: "MSD", expiry: "jan/2027" },
  { id: "IN-03", name: "Amoxicilina 250mg", category: "Medicamento", stock: 120, minStock: 40, unit: "cp", price: "R$ 3,20", supplier: "Vetnil", expiry: "ago/2027" },
  { id: "IN-04", name: "Anti-inflamatório (Meloxicam)", category: "Medicamento", stock: 15, minStock: 20, unit: "frascos", price: "R$ 28", supplier: "Ourofino", expiry: "jun/2027" },
  { id: "IN-05", name: "Ração renal premium 3kg", category: "Alimentação", stock: 32, minStock: 10, unit: "pct", price: "R$ 189", supplier: "Royal Canin", expiry: "dez/2026" },
  { id: "IN-06", name: "Kit sutura nylon 3-0", category: "Cirúrgico", stock: 5, minStock: 8, unit: "kits", price: "R$ 54", supplier: "Vetmed", expiry: "—" },
  { id: "IN-07", name: "Shampoo de clorexidina", category: "Higiene", stock: 41, minStock: 12, unit: "frascos", price: "R$ 36", supplier: "Vetnil", expiry: "nov/2027" },
];

export const invoices: Invoice[] = [
  { id: "INV-2041", client: "Camila Rocha", pet: "Simba", service: "Consulta de peso + plano alimentar", date: "10 out 2026", amount: "R$ 180", status: "Pago" },
  { id: "INV-2040", client: "João Pedro M.", pet: "Mia", service: "Painel urinário + medicação", date: "8 out 2026", amount: "R$ 420", status: "Pendente" },
  { id: "INV-2039", client: "Fernanda Alves", pet: "Bolt", service: "Fisioterapia (4 sessões)", date: "6 out 2026", amount: "R$ 640", status: "Pendente" },
  { id: "INV-2038", client: "Lucas Ferreira", pet: "Rocky", service: "Emergência + oxigenioterapia", date: "10 out 2026", amount: "R$ 890", status: "Em atraso" },
  { id: "INV-2037", client: "Patrícia Gomes", pet: "Luna", service: "Banho + corte de unhas", date: "28 set 2026", amount: "R$ 150", status: "Pago" },
  { id: "INV-2036", client: "Diego Santos", pet: "Kiwi", service: "Desgaste de bico + suplementos", date: "15 set 2026", amount: "R$ 95", status: "Pago" },
];

export const medHistory: Record<string, MedRecord[]> = {
  "PT-002": [
    { date: "8 out 2026", title: "Infecção urinária diagnosticada", vet: "Dr. Rafael Lima", details: "Cristais de estruvita encontrados. Prescrito amoxicilina por 7 dias + ração urinária." },
    { date: "12 set 2026", title: "Check-up de rotina", vet: "Dra. Marina Costa", details: "Todos os sinais vitais normais. Peso estável em 4,1kg." },
  ],
  "PT-003": [
    { date: "2 out 2026", title: "Revisão pós-operatória — LCA", vet: "Dr. Thiago Nunes", details: "Sutura limpa, boa mobilidade. Manter fisioterapia 2x por semana." },
    { date: "18 set 2026", title: "Cirurgia de LCA", vet: "Dr. Thiago Nunes", details: "TPLO realizada com sucesso. Internado 24h em observação." },
  ],
  "PT-005": [
    { date: "10 out 2026", title: "Desconforto respiratório", vet: "Dra. Marina Costa", details: "Episódio de síndrome braquicefálica. Oxigenioterapia + monitoramento." },
  ],
};

export const dashboardStats = [
  { label: "Consultas de hoje", value: "12", delta: "+3 em relação a ontem", icon: "calendar" as const },
  { label: "Pacientes ativos", value: "248", delta: "+18 este mês", icon: "paw" as const },
  { label: "Em tratamento", value: "17", delta: "2 críticos", icon: "stethoscope" as const },
  { label: "Receita (out)", value: "R$ 24,8 mil", delta: "+12% no mês", icon: "revenue" as const },
];

/* ── Hospital (Internação) ─────────────────────────────────────────── */

export type HospStatus = "Crítico" | "Em observação" | "Estável" | "Alta liberada";

export interface Hospitalization {
  id: string;
  pet: string;
  species: Species;
  owner: string;
  box: string;
  ward: "UTI" | "Geral" | "Isolamento" | "Pós-op";
  admitted: string;
  vet: string;
  diagnosis: string;
  status: HospStatus;
  temp: string;
  heartRate: string;
  prescriptionsOpen: number;
  shiftNote: string;
}

export const hospitalizations: Hospitalization[] = [
  { id: "H-01", pet: "Rocky", species: "Cão", owner: "Lucas Ferreira", box: "UTI-1", ward: "UTI", admitted: "10 out, 07:20", vet: "Dra. Marina Costa", diagnosis: "Síndrome braquicefálica", status: "Crítico", temp: "39,4°C", heartRate: "140 bpm", prescriptionsOpen: 3, shiftNote: "Plantão da noite: 2 sessões de oxigênio, respiração ofegante reduziu às 5h. Reavaliar às 12h." },
  { id: "H-02", pet: "Mia", species: "Gato", owner: "João Pedro M.", box: "GER-4", ward: "Geral", admitted: "9 out, 16:40", vet: "Dr. Rafael Lima", diagnosis: "DTUIF — acompanhamento pós-obstrução urinária", status: "Em observação", temp: "38,6°C", heartRate: "180 bpm", prescriptionsOpen: 2, shiftNote: "Urinando normalmente desde de manhã. Manter sonda por mais 24h." },
  { id: "H-03", pet: "Bolt", species: "Cão", owner: "Fernanda Alves", box: "POS-2", ward: "Pós-op", admitted: "8 out, 11:00", vet: "Dr. Thiago Nunes", diagnosis: "Pós-op de TPLO, 22º dia", status: "Estável", temp: "38,2°C", heartRate: "95 bpm", prescriptionsOpen: 1, shiftNote: "Andando com apoio. Fisio 2x ao dia, bom apetite." },
  { id: "H-04", pet: "Pipoca", species: "Ave", owner: "Particular", box: "ISO-1", ward: "Isolamento", admitted: "10 out, 09:15", vet: "Dra. Ana Beatriz", diagnosis: "Suspeita de psitacose — aguardando laboratório", status: "Em observação", temp: "—", heartRate: "—", prescriptionsOpen: 1, shiftNote: "Isolada. Resultado do exame sai na manhã do dia 11." },
  { id: "H-05", pet: "Fred", species: "Coelho", owner: "Camila Rocha", box: "GER-7", ward: "Geral", admitted: "7 out, 14:00", vet: "Dra. Marina Costa", diagnosis: "Estase gastrointestinal — em recuperação", status: "Alta liberada", temp: "38,5°C", heartRate: "220 bpm", prescriptionsOpen: 0, shiftNote: "Comendo feno, fezes normais. Liberado para alta hoje." },
];

export const wardCapacity = [
  { ward: "UTI", used: 3, total: 4 },
  { ward: "Geral", used: 6, total: 10 },
  { ward: "Pós-op", used: 2, total: 6 },
  { ward: "Isolamento", used: 1, total: 3 },
];

/* ── Vacinas ───────────────────────────────────────────────────────── */

export interface VaccineProtocol {
  name: string;
  species: Species;
  doses: string;
  interval: string;
  petsOnProtocol: number;
}

export const vaccineProtocols: VaccineProtocol[] = [
  { name: "Polivalente V8 (filhotes)", species: "Cão", doses: "3 doses", interval: "intervalo de 21 dias", petsOnProtocol: 18 },
  { name: "Reforço anual V8", species: "Cão", doses: "1 dose", interval: "a cada 12 meses", petsOnProtocol: 96 },
  { name: "Antirrábica", species: "Cão", doses: "1 dose", interval: "a cada 12 meses", petsOnProtocol: 112 },
  { name: "V4 felina + FeLV", species: "Gato", doses: "2 doses", interval: "intervalo de 21 dias", petsOnProtocol: 24 },
  { name: "RHDV (coelhos)", species: "Coelho", doses: "1 dose", interval: "a cada 12 meses", petsOnProtocol: 9 },
];

export interface VaccineDue {
  pet: string;
  owner: string;
  vaccine: string;
  due: string;
  status: "Atrasada" | "Vence esta semana" | "Em dia";
}

export const vaccinesDue: VaccineDue[] = [
  { pet: "Luna", owner: "Patrícia Gomes", vaccine: "Reforço da antirrábica", due: "2 out", status: "Atrasada" },
  { pet: "Rocky", owner: "Lucas Ferreira", vaccine: "V8 anual", due: "5 out", status: "Atrasada" },
  { pet: "Thor", owner: "Camila Rocha", vaccine: "V8 + antirrábica", due: "14 out", status: "Vence esta semana" },
  { pet: "Nina", owner: "Fernanda Alves", vaccine: "RHDV", due: "15 out", status: "Vence esta semana" },
  { pet: "Simba", owner: "Camila Rocha", vaccine: "V4 felina", due: "20 out", status: "Vence esta semana" },
  { pet: "Bolt", owner: "Fernanda Alves", vaccine: "Antirrábica", due: "2 nov", status: "Em dia" },
  { pet: "Kiwi", owner: "Diego Santos", vaccine: "— (não se aplica)", due: "—", status: "Em dia" },
];

/* ── Banho & Tosa ──────────────────────────────────────────────────── */

export type GroomStatus = "Na fila" | "Em atendimento" | "Concluído";

export interface GroomAppointment {
  id: string;
  time: string;
  pet: string;
  breed: string;
  owner: string;
  service: "Banho" | "Banho + Tosa" | "Tosa" | "Corte de unhas";
  groomer: string;
  status: GroomStatus;
  notes: string;
}

export const groomers = ["Paula S. (banhista)", "Diego R. (tosador)", "Luana M. (banhista)"];

export const groomingAgenda: GroomAppointment[] = [
  { id: "G-01", time: "08:30", pet: "Thor", breed: "Golden Retriever", owner: "Camila Rocha", service: "Banho + Tosa", groomer: "Diego R. (tosador)", status: "Concluído", notes: "Shampoo hipoalergênico. Aparar patas e orelhas." },
  { id: "G-02", time: "09:30", pet: "Luna", breed: "Persa", owner: "Patrícia Gomes", service: "Banho", groomer: "Paula S. (banhista)", status: "Em atendimento", notes: "Pediu tosa leão da próxima vez — confirmar." },
  { id: "G-03", time: "10:30", pet: "Bolt", breed: "Border Collie", owner: "Fernanda Alves", service: "Banho", groomer: "Paula S. (banhista)", status: "Na fila", notes: "Cuidado: perna de pós-op, sem imersão completa." },
  { id: "G-04", time: "11:30", pet: "Mel", breed: "Poodle", owner: "Particular", service: "Tosa", groomer: "Diego R. (tosador)", status: "Na fila", notes: "Tosa ursinho, foto de referência anexada." },
  { id: "G-05", time: "14:00", pet: "Simba", breed: "Maine Coon", owner: "Camila Rocha", service: "Banho + Tosa", groomer: "Luana M. (banhista)", status: "Na fila", notes: "Hidratação e remoção de subpelo." },
];

export interface GroomPackage {
  id: string;
  client: string;
  pet: string;
  plan: string;
  used: number;
  total: number;
  expires: string;
  savings: string;
}

export const groomPackages: GroomPackage[] = [
  { id: "PK-01", client: "Camila Rocha", pet: "Thor", plan: "4 banhos / mês", used: 3, total: 4, expires: "31 out", savings: "economiza R$ 60" },
  { id: "PK-02", client: "Fernanda Alves", pet: "Bolt", plan: "4 banhos / mês", used: 1, total: 4, expires: "31 out", savings: "economiza R$ 60" },
  { id: "PK-03", client: "Patrícia Gomes", pet: "Luna", plan: "2 tosas / mês", used: 2, total: 2, expires: "20 out", savings: "economiza R$ 45" },
];

/* ── PDV Pet Shop ──────────────────────────────────────────────────── */

export interface Product {
  id: string;
  name: string;
  category: "Alimentação" | "Higiene" | "Brinquedos" | "Medicamentos" | "Acessórios";
  price: number;
  stock: number;
  color: string;
}

export const products: Product[] = [
  { id: "P-01", name: "Ração renal premium 3kg", category: "Alimentação", price: 189, stock: 32, color: "bg-amber-500" },
  { id: "P-02", name: "Ração filhotes 10kg", category: "Alimentação", price: 249, stock: 18, color: "bg-orange-500" },
  { id: "P-03", name: "Shampoo de clorexidina", category: "Higiene", price: 36, stock: 41, color: "bg-sky-500" },
  { id: "P-04", name: "Petiscos dentais (pct c/ 7)", category: "Alimentação", price: 28, stock: 54, color: "bg-emerald-500" },
  { id: "P-05", name: "Patinho de borracha", category: "Brinquedos", price: 24, stock: 26, color: "bg-pink-500" },
  { id: "P-06", name: "Ratinhos com catnip (pct c/ 3)", category: "Brinquedos", price: 19, stock: 38, color: "bg-violet-500" },
  { id: "P-07", name: "Antiparasitário pipeta", category: "Medicamentos", price: 58, stock: 22, color: "bg-red-500" },
  { id: "P-08", name: "Guia + coleira de couro", category: "Acessórios", price: 89, stock: 14, color: "bg-stone-500" },
];

export interface Sale {
  id: string;
  client: string;
  items: number;
  total: string;
  method: string;
  seller: string;
  time: string;
}

export const recentSales: Sale[] = [
  { id: "S-881", client: "Camila Rocha", items: 3, total: "R$ 253", method: "Cartão", seller: "Ana (recepção)", time: "10:42" },
  { id: "S-880", client: "Diego Santos", items: 2, total: "R$ 77", method: "Pix", seller: "Ana (recepção)", time: "10:15" },
  { id: "S-879", client: "Particular", items: 1, total: "R$ 36", method: "Dinheiro", seller: "Paula S.", time: "09:50" },
];

/* ── Financeiro ────────────────────────────────────────────────────── */

export interface Transaction {
  id: string;
  description: string;
  category: string;
  date: string;
  amount: number;
  kind: "income" | "expense";
  status: "Pago" | "Pendente";
  method: string;
}

export const transactions: Transaction[] = [
  { id: "T-01", description: "Consultas + vacinas (hoje)", category: "Clínica", date: "10 out", amount: 2140, kind: "income", status: "Pago", method: "Misto" },
  { id: "T-02", description: "Vendas do pet shop (hoje)", category: "Pet shop", date: "10 out", amount: 980, kind: "income", status: "Pago", method: "Cartão/Pix" },
  { id: "T-03", description: "Banho & tosa (hoje)", category: "Banho & tosa", date: "10 out", amount: 640, kind: "income", status: "Pago", method: "Pix" },
  { id: "T-04", description: "Emergência + oxigênio (Rocky)", category: "Hospital", date: "10 out", amount: 890, kind: "income", status: "Pendente", method: "Cartão" },
  { id: "T-05", description: "Fornecedor — Vetnil (medicamentos)", category: "Estoque", date: "9 out", amount: 1320, kind: "expense", status: "Pendente", method: "Boleto" },
  { id: "T-06", description: "Comissões da equipe (set)", category: "Equipe", date: "5 out", amount: 2860, kind: "expense", status: "Pago", method: "Transferência" },
  { id: "T-07", description: "Aluguel + contas", category: "Fixos", date: "5 out", amount: 4500, kind: "expense", status: "Pago", method: "Transferência" },
];

export const revenueByGroup = [
  { group: "Consultas", value: 9200, pct: 82 },
  { group: "Cirurgias", value: 6400, pct: 57 },
  { group: "Pet shop", value: 5100, pct: 45 },
  { group: "Banho & tosa", value: 3300, pct: 29 },
  { group: "Vacinas", value: 2800, pct: 25 },
];

export const teamPerformance = [
  { name: "Dra. Marina Costa", role: "Veterinária", sales: "R$ 8,2 mil", commission: "R$ 820" },
  { name: "Dr. Rafael Lima", role: "Veterinário", sales: "R$ 6,4 mil", commission: "R$ 640" },
  { name: "Diego R.", role: "Tosador", sales: "R$ 3,3 mil", commission: "R$ 495" },
  { name: "Ana", role: "Recepção / vendas", sales: "R$ 5,1 mil", commission: "R$ 255" },
];

/* ── Marketing / CRM ───────────────────────────────────────────────── */

export interface Automation {
  name: string;
  trigger: string;
  channel: "WhatsApp" | "SMS" | "E-mail";
  active: boolean;
  sent: string;
}

export const automations: Automation[] = [
  { name: "Lembrete de consulta", trigger: "24h antes da visita", channel: "WhatsApp", active: true, sent: "312 este mês" },
  { name: "Alerta de vacina", trigger: "7 dias antes do vencimento", channel: "WhatsApp", active: true, sent: "148 este mês" },
  { name: "Parabéns de aniversário", trigger: "Aniversário do pet", channel: "WhatsApp", active: true, sent: "86 este mês" },
  { name: "Recuperar quem sumiu", trigger: "60 dias sem visita", channel: "SMS", active: false, sent: "—" },
  { name: "Resultado de exame pronto", trigger: "Laudo anexado", channel: "E-mail", active: true, sent: "204 este mês" },
];

export interface Campaign {
  name: string;
  audience: string;
  channel: string;
  reach: string;
  response: string;
}

export const campaigns: Campaign[] = [
  { name: "Mutirão antirrábica de outubro", audience: "Cães com antirrábica atrasada", channel: "WhatsApp", reach: "64 tutores", response: "31% agendaram" },
  { name: "Promo de pacote de banho", audience: "Clientes de banho sem pacote", channel: "SMS", reach: "120 tutores", response: "12% converteram" },
  { name: "Semana do check-up sênior", audience: "Pets com 7 anos ou mais", channel: "E-mail", reach: "210 tutores", response: "18% abriram" },
];
