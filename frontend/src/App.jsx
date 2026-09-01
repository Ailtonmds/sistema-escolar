import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Alert,
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ClassIcon from '@mui/icons-material/Class';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SchoolIcon from '@mui/icons-material/School';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BarChartIcon from '@mui/icons-material/BarChart';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import LogoutIcon from '@mui/icons-material/Logout';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Slide from '@mui/material/Slide';

const API_BASE_URL = '';
const drawerWidth = 260;

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#4f46e5', light: '#818cf8', dark: '#3730a3' },
    secondary: { main: '#06b6d4' },
    success: { main: '#10b981' },
    warning: { main: '#f59e0b' },
    error: { main: '#ef4444' },
    background: { default: '#f4f6fb', paper: '#ffffff' },
    text: { primary: '#0f172a', secondary: '#64748b' },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
    h4: { fontWeight: 800, letterSpacing: -0.5 },
    h5: { fontWeight: 800, letterSpacing: -0.5 },
    h6: { fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
    MuiButton: { defaultProps: { disableElevation: true } },
    MuiCard: { styleOverrides: { root: { boxShadow: '0 1px 2px rgba(15,23,42,0.04)' } } },
    MuiTooltip: { defaultProps: { arrow: true } },
  },
});

const initialForm = {
  nome: '',
  email: '',
  data_nascimento: '',
  serie: '',
  turma_id: '',
  cpf: '',
  telefone: '',
  endereco: '',
};

const initialTurmaForm = {
  nome: '',
  serie: '',
  ano: '',
};

const initialNotaForm = {
  aluno_id: '',
  disciplina: '',
  bimestre: 1,
  nota: '',
};

const initialFrequenciaForm = {
  aluno_id: '',
  data_aula: new Date().toISOString().split('T')[0],
  presente: true,
};

const menuItems = [
  { key: 'dashboard', label: 'Início', description: 'Visão geral do sistema', icon: <DashboardIcon /> },
  { key: 'alunos', label: 'Alunos', description: 'Cadastro e consulta de estudantes', icon: <PeopleIcon /> },
  { key: 'turmas', label: 'Turmas', description: 'Organização escolar', icon: <ClassIcon /> },
  { key: 'disciplinas', label: 'Disciplinas', description: 'Matérias e currículo', icon: <MenuBookIcon /> },
  { key: 'notas', label: 'Notas / Boletim', description: 'Lançamento e consulta de notas', icon: <AssessmentIcon /> },
  { key: 'frequencia', label: 'Chamada', description: 'Registro de frequência dos alunos', icon: <HowToRegIcon /> },
  { key: 'professores', label: 'Professores', description: 'Gestão da equipe', icon: <SupervisorAccountIcon /> },
  { key: 'financeiro', label: 'Financeiro', description: 'Mensalidades e contas', icon: <AttachMoneyIcon /> },
  { key: 'relatorios', label: 'Relatórios', description: 'Indicadores da escola', icon: <BarChartIcon /> },
];

const initialDisciplinaForm = {
  nome: '',
  descricao: '',
};

const initialProfessorForm = {
  nome: '',
  email: '',
  telefone: '',
  turma_id: '',
  disciplina_ids: [],
};

const seriesOptions = ['1º Ano', '2º Ano', '3º Ano', '4º Ano', '5º Ano'];

const bimestreMap = {
  1: '1° Bimestre',
  2: '2° Bimestre',
  3: '3° Bimestre',
  4: '4° Bimestre',
};

function getInitials(nome = '') {
  return nome
    .split(' ')
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function notaColor(nota) {
  if (nota >= 6) return 'success.main';
  if (nota >= 4) return 'warning.main';
  return 'error.main';
}

function statusFromMedia(media) {
  if (media >= 6) return { texto: 'Aprovado', cor: 'success.main', bg: 'rgba(16,185,129,0.12)', progressColor: 'success' };
  if (media >= 4) return { texto: 'Recuperação', cor: 'warning.main', bg: 'rgba(245,158,11,0.12)', progressColor: 'warning' };
  return { texto: 'Reprovado', cor: 'error.main', bg: 'rgba(239,68,68,0.12)', progressColor: 'error' };
}

function StatCard({ icon, tint, label, value, sub }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300 }}>
      <Card sx={{ height: '100%' }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2.5, p: 3 }}>
          <Avatar variant="rounded" sx={{ bgcolor: tint.bg, color: tint.fg, width: 54, height: 54, borderRadius: 3 }}>
            {icon}
          </Avatar>
          <Box>
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              {label}
            </Typography>
            <Typography variant="h4" lineHeight={1.2}>
              {value}
            </Typography>
            {sub && (
              <Typography variant="caption" color="text.secondary">
                {sub}
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function SectionCard({ title, action, children }) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2} mb={2.5}>
          <Typography variant="h6">{title}</Typography>
          {action}
        </Box>
        {children}
      </CardContent>
    </Card>
  );
}

function SearchField({ placeholder, value, onChange }) {
  return (
    <TextField
      size="small"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      sx={{ minWidth: 260 }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon fontSize="small" color="action" />
          </InputAdornment>
        ),
      }}
    />
  );
}

function ConfirmDialog({ open, title, description, onCancel, onConfirm }) {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth="xs"
      fullWidth
      PaperProps={{ sx: { borderRadius: 4 } }}
    >
      <DialogTitle fontWeight={700}>{title}</DialogTitle>
      <DialogContent>
        <Typography color="text.secondary">{description}</Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button onClick={onCancel} color="inherit">Cancelar</Button>
        <Button onClick={onConfirm} color="error" variant="contained" startIcon={<DeleteIcon />}>
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function EmptyState({ icon, text }) {
  return (
    <Stack alignItems="center" py={5} spacing={1.5}>
      <Avatar sx={{ bgcolor: 'grey.100', color: 'text.secondary', width: 56, height: 56 }}>{icon}</Avatar>
      <Typography color="text.secondary">{text}</Typography>
    </Stack>
  );
}

function App() {
  const [form, setForm] = useState(initialForm);
  const [alunos, setAlunos] = useState([]);
  const [editingAlunoId, setEditingAlunoId] = useState(null);
  const [searchAluno, setSearchAluno] = useState('');

  const [turmaForm, setTurmaForm] = useState(initialTurmaForm);
  const [turmas, setTurmas] = useState([]);
  const [editingTurmaId, setEditingTurmaId] = useState(null);
  const [searchTurma, setSearchTurma] = useState('');

  const [notaForm, setNotaForm] = useState(initialNotaForm);
  const [notas, setNotas] = useState([]);
  const [filtroAlunoId, setFiltroAlunoId] = useState('');

  const [frequenciaForm, setFrequenciaForm] = useState(initialFrequenciaForm);
  const [frequencias, setFrequencias] = useState([]);

  const [disciplinaForm, setDisciplinaForm] = useState(initialDisciplinaForm);
  const [disciplinas, setDisciplinas] = useState([]);
  const [editingDisciplinaId, setEditingDisciplinaId] = useState(null);
  const [searchDisciplina, setSearchDisciplina] = useState('');

  const [professorForm, setProfessorForm] = useState(initialProfessorForm);
  const [professores, setProfessores] = useState([]);
  const [editingProfessorId, setEditingProfessorId] = useState(null);
  const [searchProfessor, setSearchProfessor] = useState('');

  const [view, setView] = useState('dashboard');
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ usuario: '', senha: '' });
  const [anchorEl, setAnchorEl] = useState(null);

  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });
  const [pendingDelete, setPendingDelete] = useState(null);

  const notify = (message, severity = 'success') => setSnack({ open: true, message, severity });
  const closeSnack = (_event, reason) => {
    if (reason === 'clickaway') return;
    setSnack((s) => ({ ...s, open: false }));
  };

  const carregarAlunos = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/alunos`);
      if (!response.ok) throw new Error('Erro ao carregar alunos');
      setAlunos(await response.json());
    } catch (error) {
      console.error(error);
    }
  };

  const carregarTurmas = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/turmas`);
      if (!response.ok) throw new Error('Erro ao carregar turmas');
      setTurmas(await response.json());
    } catch (error) {
      console.error(error);
    }
  };

  const carregarNotas = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/notas`);
      if (!response.ok) throw new Error('Erro ao carregar notas');
      setNotas(await response.json());
    } catch (error) {
      console.error(error);
    }
  };

  const carregarFrequencias = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/frequencias`);
      if (!response.ok) throw new Error('Erro ao carregar frequências');
      setFrequencias(await response.json());
    } catch (error) {
      console.error(error);
    }
  };

  const carregarDisciplinas = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/disciplinas`);
      if (!response.ok) throw new Error('Erro ao carregar disciplinas');
      setDisciplinas(await response.json());
    } catch (error) {
      console.error(error);
    }
  };

  const carregarProfessores = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/professores`);
      if (!response.ok) throw new Error('Erro ao carregar professores');
      setProfessores(await response.json());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (loggedIn) {
      carregarAlunos();
      carregarTurmas();
      carregarNotas();
      carregarFrequencias();
      carregarDisciplinas();
      carregarProfessores();
    }
  }, [loggedIn]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleTurmaChange = (e) => setTurmaForm({ ...turmaForm, [e.target.name]: e.target.value });
  const handleNotaChange = (e) => setNotaForm({ ...notaForm, [e.target.name]: e.target.value });
  const handleFrequenciaChange = (e) => setFrequenciaForm({ ...frequenciaForm, [e.target.name]: e.target.value });
  const handleLoginChange = (e) => setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  const handleDisciplinaChange = (e) => setDisciplinaForm({ ...disciplinaForm, [e.target.name]: e.target.value });
  const handleProfessorChange = (e) => setProfessorForm({ ...professorForm, [e.target.name]: e.target.value });

  const criarFrequenciaLocal = () => ({
    id: Date.now(),
    aluno_id: parseInt(frequenciaForm.aluno_id),
    data_aula: frequenciaForm.data_aula,
    presente: frequenciaForm.presente,
  });

  const handleFrequenciaSubmit = async (event) => {
    event.preventDefault();

    if (!frequenciaForm.aluno_id || !frequenciaForm.data_aula) {
      notify('Preencha todos os campos da chamada.', 'error');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/frequencias`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          aluno_id: parseInt(frequenciaForm.aluno_id),
          data_aula: frequenciaForm.data_aula,
          presente: frequenciaForm.presente,
        }),
      });

      if (!response.ok) {
        setFrequencias((prev) => [...prev, criarFrequenciaLocal()]);
        notify('Frequência registrada com sucesso! (modo local)', 'warning');
      } else {
        notify('Frequência registrada com sucesso!');
        carregarFrequencias();
      }

      setFrequenciaForm({
        ...initialFrequenciaForm,
        data_aula: frequenciaForm.data_aula,
      });
    } catch (error) {
      setFrequencias((prev) => [...prev, criarFrequenciaLocal()]);
      notify('Frequência registrada com sucesso! (modo local)', 'warning');
      setFrequenciaForm({
        ...initialFrequenciaForm,
        data_aula: frequenciaForm.data_aula,
      });
    }
  };

  const formatarData = (data) => {
    if (!data) return '—';
    const partes = String(data).split('T')[0].split('-');
    if (partes.length !== 3) return data;
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    if (loginForm.usuario && loginForm.senha) {
      setLoggedIn(true);
    } else {
      notify('Informe usuário e senha.', 'error');
    }
  };

  // CRUD ALUNOS
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const method = editingAlunoId ? 'PUT' : 'POST';
      const url = editingAlunoId ? `${API_BASE_URL}/api/alunos/${editingAlunoId}` : `${API_BASE_URL}/api/alunos`;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || 'Erro ao salvar aluno');
      }

      notify(editingAlunoId ? 'Aluno atualizado com sucesso!' : 'Aluno cadastrado com sucesso!');
      setForm(initialForm);
      setEditingAlunoId(null);
      carregarAlunos();
    } catch (error) {
      notify(error.message, 'error');
    }
  };

  const handleEditAluno = (aluno) => {
    setForm(aluno);
    setEditingAlunoId(aluno.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const confirmDelete = () => {
    if (!pendingDelete) return;
    pendingDelete.action();
    setPendingDelete(null);
  };

  const askDeleteAluno = (id) => {
    setPendingDelete({
      title: 'Excluir aluno',
      description: 'Esta ação não pode ser desfeita. Deseja realmente excluir este aluno?',
      action: async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/api/alunos/${id}`, { method: 'DELETE' });
          if (!response.ok) throw new Error('Erro ao excluir aluno');
          notify('Aluno excluído com sucesso!');
          carregarAlunos();
        } catch (error) {
          setAlunos((prev) => prev.filter((a) => a.id !== id));
          notify('Aluno excluído (modo local).', 'warning');
        }
      },
    });
  };

  const alunosFiltrados = alunos.filter((aluno) =>
    [aluno.nome, aluno.email, aluno.serie, aluno.cpf, aluno.telefone, aluno.endereco]
      .some((val) => String(val).toLowerCase().includes(searchAluno.toLowerCase()))
  );

  // CRUD TURMAS
  const handleTurmaSubmit = async (event) => {
    event.preventDefault();
    try {
      const method = editingTurmaId ? 'PUT' : 'POST';
      const url = editingTurmaId ? `${API_BASE_URL}/api/turmas/${editingTurmaId}` : `${API_BASE_URL}/api/turmas`;

      const body = {
        nome: turmaForm.nome,
        serie: turmaForm.serie,
        ano: parseInt(turmaForm.ano, 10),
      };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || 'Erro ao salvar turma');
      }

      notify(editingTurmaId ? 'Turma atualizada com sucesso!' : 'Turma cadastrada com sucesso!');
      setTurmaForm(initialTurmaForm);
      setEditingTurmaId(null);
      carregarTurmas();
    } catch (error) {
      notify(error.message, 'error');
    }
  };

  const handleEditTurma = (turma) => {
    setTurmaForm({ nome: turma.nome, serie: turma.serie, ano: turma.ano });
    setEditingTurmaId(turma.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const askDeleteTurma = (id) => {
    setPendingDelete({
      title: 'Excluir turma',
      description: 'Esta ação não pode ser desfeita. Deseja realmente excluir esta turma?',
      action: async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/api/turmas/${id}`, { method: 'DELETE' });
          if (!response.ok) throw new Error('Erro ao excluir turma');
          notify('Turma excluída com sucesso!');
          carregarTurmas();
        } catch (error) {
          setTurmas((prev) => prev.filter((t) => t.id !== id));
          notify('Turma excluída (modo local).', 'warning');
        }
      },
    });
  };

  const turmasFiltradas = turmas.filter((turma) =>
    [turma.nome, turma.serie, String(turma.ano)]
      .some((val) => String(val).toLowerCase().includes(searchTurma.toLowerCase()))
  );

  // CRUD DISCIPLINAS
  const handleDisciplinaSubmit = async (event) => {
    event.preventDefault();
    try {
      const method = editingDisciplinaId ? 'PUT' : 'POST';
      const url = editingDisciplinaId
        ? `${API_BASE_URL}/api/disciplinas/${editingDisciplinaId}`
        : `${API_BASE_URL}/api/disciplinas`;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(disciplinaForm),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Erro ao salvar disciplina');
      }

      notify(editingDisciplinaId ? 'Disciplina atualizada com sucesso!' : 'Disciplina cadastrada com sucesso!');
      setDisciplinaForm(initialDisciplinaForm);
      setEditingDisciplinaId(null);
      carregarDisciplinas();
    } catch (error) {
      notify(error.message, 'error');
    }
  };

  const handleEditDisciplina = (disciplina) => {
    setDisciplinaForm({ nome: disciplina.nome, descricao: disciplina.descricao || '' });
    setEditingDisciplinaId(disciplina.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const askDeleteDisciplina = (id) => {
    setPendingDelete({
      title: 'Excluir disciplina',
      description: 'Esta ação não pode ser desfeita. Deseja realmente excluir esta disciplina?',
      action: async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/api/disciplinas/${id}`, { method: 'DELETE' });
          if (!response.ok) throw new Error('Erro ao excluir disciplina');
          notify('Disciplina excluída com sucesso!');
          carregarDisciplinas();
        } catch (error) {
          setDisciplinas((prev) => prev.filter((d) => d.id !== id));
          notify('Disciplina excluída (modo local).', 'warning');
        }
      },
    });
  };

  const disciplinasFiltradas = disciplinas.filter((d) =>
    [d.nome, d.descricao].some((val) =>
      String(val || '').toLowerCase().includes(searchDisciplina.toLowerCase())
    )
  );

  // CRUD PROFESSORES
  const handleProfessorSubmit = async (event) => {
    event.preventDefault();
    try {
      const method = editingProfessorId ? 'PUT' : 'POST';
      const url = editingProfessorId
        ? `${API_BASE_URL}/api/professores/${editingProfessorId}`
        : `${API_BASE_URL}/api/professores`;

      const body = {
        nome: professorForm.nome,
        email: professorForm.email,
        telefone: professorForm.telefone,
        turma_id: professorForm.turma_id ? parseInt(professorForm.turma_id, 10) : null,
        disciplina_ids: professorForm.disciplina_ids.map(Number),
      };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Erro ao salvar professor');
      }

      notify(editingProfessorId ? 'Professor atualizado com sucesso!' : 'Professor cadastrado com sucesso!');
      setProfessorForm(initialProfessorForm);
      setEditingProfessorId(null);
      carregarProfessores();
    } catch (error) {
      notify(error.message, 'error');
    }
  };

  const handleEditProfessor = (professor) => {
    setProfessorForm({
      nome: professor.nome,
      email: professor.email || '',
      telefone: professor.telefone || '',
      turma_id: professor.turma_id ? String(professor.turma_id) : '',
      disciplina_ids: (professor.disciplinas || []).map((d) => d.id),
    });
    setEditingProfessorId(professor.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const askDeleteProfessor = (id) => {
    setPendingDelete({
      title: 'Excluir professor',
      description: 'Esta ação não pode ser desfeita. Deseja realmente excluir este professor?',
      action: async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/api/professores/${id}`, { method: 'DELETE' });
          if (!response.ok) throw new Error('Erro ao excluir professor');
          notify('Professor excluído com sucesso!');
          carregarProfessores();
        } catch (error) {
          setProfessores((prev) => prev.filter((p) => p.id !== id));
          notify('Professor excluído (modo local).', 'warning');
        }
      },
    });
  };

  const professoresFiltrados = professores.filter((p) =>
    [p.nome, p.email, p.telefone]
      .some((val) => String(val || '').toLowerCase().includes(searchProfessor.toLowerCase()))
  );

  // CADASTRO DE NOTA
  const criarNotaLocal = () => ({
    id: Date.now(),
    aluno_id: parseInt(notaForm.aluno_id),
    disciplina: parseInt(notaForm.disciplina),
    bimestre: parseInt(notaForm.bimestre),
    nota: parseFloat(notaForm.nota),
  });

  const handleNotaSubmit = async (event) => {
    event.preventDefault();
    const valorNota = parseFloat(notaForm.nota);

    if (!notaForm.aluno_id || !notaForm.disciplina || isNaN(valorNota)) {
      notify('Preencha todos os campos corretamente.', 'error');
      return;
    }

    if (valorNota < 0 || valorNota > 10) {
      notify('A nota deve estar entre 0 e 10.', 'error');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/notas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...notaForm,
          aluno_id: parseInt(notaForm.aluno_id),
          disciplina: parseInt(notaForm.disciplina),
          bimestre: parseInt(notaForm.bimestre),
          nota: valorNota,
        }),
      });

      if (!response.ok) {
        setNotas((prev) => [...prev, criarNotaLocal()]);
        notify('Nota salva com sucesso! (modo local)', 'warning');
      } else {
        notify('Nota salva com sucesso!');
        carregarNotas();
      }

      setNotaForm(initialNotaForm);
    } catch (error) {
      setNotas((prev) => [...prev, criarNotaLocal()]);
      notify('Nota salva com sucesso! (modo local)', 'warning');
      setNotaForm(initialNotaForm);
    }
  };

  if (!loggedIn) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#0b1020', position: 'relative', overflow: 'hidden', p: 2 }}>
          <motion.div
            animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', top: '-15%', right: '-10%', width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,70,229,0.45), transparent 65%)', filter: 'blur(40px)' }}
          />
          <motion.div
            animate={{ x: [0, -35, 0], y: [0, 25, 0] }}
            transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', bottom: '-20%', left: '-8%', width: 520, height: 520, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.35), transparent 65%)', filter: 'blur(40px)' }}
          />

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} style={{ position: 'relative' }}>
            <Paper sx={{ p: { xs: 3.5, md: 5 }, borderRadius: 5, width: 400, maxWidth: '100%', boxShadow: '0 30px 60px rgba(2,6,23,0.55)' }}>
              <Stack spacing={3} alignItems="center">
                <motion.div animate={{ rotate: [0, -8, 8, 0] }} transition={{ duration: 5, repeat: Infinity, repeatDelay: 3 }}>
                  <Avatar sx={{ width: 64, height: 64, background: 'linear-gradient(135deg,#4f46e5,#06b6d4)', borderRadius: 4 }}>
                    <SchoolIcon sx={{ fontSize: 34 }} />
                  </Avatar>
                </motion.div>

                <Box textAlign="center">
                  <Typography variant="h5" fontWeight={800}>Portal Escolar</Typography>
                  <Typography variant="body2" color="text.secondary" mt={0.5}>
                    Acesso restrito ao painel administrativo.
                  </Typography>
                </Box>

                <form onSubmit={handleLoginSubmit} style={{ width: '100%' }}>
                  <Stack spacing={2.5}>
                    <TextField fullWidth label="Usuário" name="usuario" value={loginForm.usuario} onChange={handleLoginChange} />
                    <TextField fullWidth label="Senha" name="senha" type="password" value={loginForm.senha} onChange={handleLoginChange} />
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        sx={{ py: 1.4, borderRadius: 3, background: 'linear-gradient(90deg,#4f46e5,#7c3aed)', '&:hover': { background: 'linear-gradient(90deg,#4338ca,#6d28d9)' } }}
                      >
                        Entrar no Sistema
                      </Button>
                    </motion.div>
                  </Stack>
                </form>

                <Typography variant="caption" color="text.secondary" textAlign="center">
                  Ambiente de demonstração • v2.0
                </Typography>
              </Stack>
            </Paper>
          </motion.div>
        </Box>
      </ThemeProvider>
    );
  }

  const totalAlunos = alunos.length;
  const totalTurmas = turmas.length;
  const mediaGeralTurma = notas.length > 0
    ? (notas.reduce((acc, curr) => acc + curr.nota, 0) / notas.length).toFixed(1)
    : '0.0';

  const notasFiltradasBoletim = filtroAlunoId
    ? notas.filter((n) => n.aluno_id === parseInt(filtroAlunoId))
    : notas;

  const mediaBoletim = notasFiltradasBoletim.length > 0
    ? (notasFiltradasBoletim.reduce((acc, curr) => acc + curr.nota, 0) / notasFiltradasBoletim.length)
    : null;

  const situacao = mediaBoletim !== null ? statusFromMedia(mediaBoletim) : null;

  const ultimasNotas = [...notas].slice(-5).reverse();

  const renderNotaRow = (item) => {
    const alunoObj = alunos.find((a) => a.id === item.aluno_id);
    return (
      <motion.div key={item.id} whileHover={{ x: 4 }}>
        <Box
          sx={{
            p: 2,
            border: '1px solid',
            borderColor: 'grey.200',
            borderRadius: 3,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            bgcolor: 'background.paper',
            transition: 'border-color .2s, box-shadow .2s',
            '&:hover': { borderColor: 'primary.light', boxShadow: '0 4px 14px rgba(79,70,229,0.08)' },
          }}
        >
          <Box display="flex" alignItems="center" gap={2} minWidth={0}>
            <Avatar sx={{ bgcolor: 'primary.50', color: 'primary.main', fontWeight: 700, display: { xs: 'none', sm: 'flex' } }}>
              {getInitials(alunoObj?.nome)}
            </Avatar>
            <Box minWidth={0}>
              <Typography fontWeight={600} noWrap>
                {alunoObj ? alunoObj.nome : 'Aluno não localizado'}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                {disciplinas.find((d) => d.id === item.disciplina)?.nome || item.disciplina} • {bimestreMap[item.bimestre] || item.bimestre}
              </Typography>
            </Box>
          </Box>
          <Chip
            label={Number(item.nota).toFixed(1)}
            sx={{ bgcolor: 'transparent', border: '2px solid', borderColor: notaColor(item.nota), color: notaColor(item.nota), fontWeight: 800, fontSize: '1rem', px: 0.5 }}
          />
        </Box>
      </motion.div>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        {/* TOPBAR */}
        <AppBar
          position="fixed"
          sx={{
            zIndex: (t) => t.zIndex.drawer + 1,
            bgcolor: 'rgba(244,246,251,0.82)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(15,23,42,0.07)',
            boxShadow: 'none',
            color: 'text.primary',
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Avatar variant="rounded" sx={{ width: 36, height: 36, borderRadius: 2.5, background: 'linear-gradient(135deg,#4f46e5,#06b6d4)' }}>
                <SchoolIcon sx={{ fontSize: 21 }} />
              </Avatar>
              <Typography variant="h6" noWrap fontWeight={800}>
                Painel Escolar
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Chip
                icon={<TrendingUpIcon />}
                label={`Média geral ${mediaGeralTurma}`}
                size="small"
                sx={{ display: { xs: 'none', md: 'inline-flex' }, fontWeight: 600, bgcolor: 'rgba(16,185,129,0.1)', color: 'success.main' }}
              />
              <Tooltip title="Conta">
                <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} size="small">
                  <Avatar sx={{ width: 38, height: 38, bgcolor: 'primary.main', fontWeight: 700 }}>
                    {getInitials(loginForm.usuario) || 'AD'}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                PaperProps={{ sx: { borderRadius: 3, minWidth: 180, mt: 1 } }}
              >
                <Box px={2} py={1}>
                  <Typography variant="subtitle2" fontWeight={700}>{loginForm.usuario || 'Administrador'}</Typography>
                  <Typography variant="caption" color="text.secondary">Administrador</Typography>
                </Box>
                <Divider />
                <MenuItem
                  onClick={() => { setAnchorEl(null); setLoggedIn(false); }}
                  sx={{ color: 'error.main', mt: 0.5 }}
                >
                  <ListItemIcon><LogoutIcon fontSize="small" sx={{ color: 'error.main' }} /></ListItemIcon>
                  Sair
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>

        {/* SIDEBAR */}
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: 'border-box',
              background: 'linear-gradient(180deg,#0b1020 0%,#111936 100%)',
              color: '#fff',
              borderRight: 'none',
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto', mt: 2, px: 1.5 }}>
            <List sx={{ position: 'relative' }}>
              {menuItems.map((item) => {
                const isSelected = view === item.key;
                return (
                  <ListItem key={item.key} disablePadding sx={{ mb: 0.5 }}>
                    <ListItemButton
                      onClick={() => setView(item.key)}
                      sx={{ borderRadius: 2.5, py: 1.2, px: 2, position: 'relative' }}
                      disableRipple
                    >
                      {isSelected && (
                        <motion.div
                          layoutId="nav-pill"
                          transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                          style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: 12,
                            background: 'linear-gradient(90deg, rgba(79,70,229,0.85), rgba(124,58,237,0.75))',
                            boxShadow: '0 6px 18px rgba(79,70,229,0.45)',
                          }}
                        />
                      )}
                      <ListItemIcon sx={{ color: isSelected ? '#fff' : '#8b93ad', minWidth: 42, position: 'relative' }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{
                          fontSize: '0.92rem',
                          fontWeight: isSelected ? 700 : 500,
                          color: isSelected ? '#fff' : '#aab1c9',
                          position: 'relative',
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>

            <Paper
              elevation={0}
              sx={{
                mt: 4,
                mx: 0.5,
                mb: 3,
                p: 2.5,
                borderRadius: 4,
                background: 'linear-gradient(135deg, rgba(79,70,229,0.35), rgba(6,182,212,0.25))',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                <AnalyticsIcon sx={{ color: '#67e8f9' }} />
                <Box>
                  <Typography variant="body2" fontWeight={700} color="#f1f5f9">
                    {totalAlunos} alunos • {totalTurmas} turmas • {professores.length} professores
                  </Typography>
                  <Typography variant="caption" color="#94a3b8">
                    Resumo em tempo real
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Box>
        </Drawer>

        {/* CONTEÚDO */}
        <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 3 }, width: `calc(100% - ${drawerWidth}px)` }}>
          <Toolbar />
          <Container maxWidth="xl" disableGutters>
            <AnimatePresence mode="wait">
              <motion.div
                key={view}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
              >
                {/* DASHBOARD */}
                {view === 'dashboard' && (
                  <Box>
                    <Paper
                      sx={{
                        p: { xs: 3, md: 4 },
                        mb: 3,
                        borderRadius: 5,
                        color: '#fff',
                        background: 'linear-gradient(120deg,#4f46e5 0%,#7c3aed 55%,#0891b2 130%)',
                        boxShadow: '0 18px 40px rgba(79,70,229,0.35)',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      <Box sx={{ position: 'absolute', right: -60, top: -80, width: 280, height: 280, borderRadius: '50%', background: 'rgba(255,255,255,0.09)' }} />
                      <Box sx={{ position: 'absolute', right: 90, bottom: -110, width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
                      <Box position="relative">
                        <Chip label="Painel administrativo" size="small" sx={{ bgcolor: 'rgba(255,255,255,0.16)', color: '#fff', fontWeight: 600, mb: 1.5 }} />
                        <Typography variant="h4" gutterBottom>
                          Bem-vindo, {loginForm.usuario || 'Administrador'} 👋
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.85)', maxWidth: 560 }}>
                          Acompanhe o resumo da escola abaixo ou utilize o menu lateral para gerenciar alunos, turmas e notas.
                        </Typography>
                      </Box>
                    </Paper>

                    <Grid container spacing={3} sx={{ mb: 3 }}>
                      <Grid item xs={12} sm={6} md={4}>
                        <StatCard icon={<PeopleIcon />} tint={{ bg: 'rgba(79,70,229,0.1)', fg: 'primary.main' }} label="Total de Alunos" value={totalAlunos} sub="matrículas ativas" />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <StatCard icon={<ClassIcon />} tint={{ bg: 'rgba(245,158,11,0.12)', fg: 'warning.main' }} label="Turmas Cadastradas" value={totalTurmas} sub="em funcionamento" />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <StatCard icon={<AnalyticsIcon />} tint={{ bg: 'rgba(16,185,129,0.12)', fg: 'success.main' }} label="Média Geral da Escola" value={mediaGeralTurma} sub={`${notas.length} lançamentos de nota`} />
                      </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                      <Grid item xs={12} md={7}>
                        <SectionCard title="Acesso rápido">
                          <Grid container spacing={1.5}>
                            {menuItems.slice(1, 6).map((item) => (
                              <Grid item xs={12} sm={6} key={item.key}>
                                <Button
                                  fullWidth
                                  variant="outlined"
                                  onClick={() => setView(item.key)}
                                  sx={{ p: 2, borderRadius: 3, justifyContent: 'flex-start', textAlign: 'left', borderColor: 'grey.300', color: 'text.primary', '&:hover': { borderColor: 'primary.light', bgcolor: 'primary.50' } }}
                                >
                                  <Stack direction="row" spacing={1.5} alignItems="center">
                                    <Avatar variant="rounded" sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: 'rgba(79,70,229,0.1)', color: 'primary.main' }}>
                                      {item.icon}
                                    </Avatar>
                                    <Box textAlign="left">
                                      <Typography fontWeight={700}>{item.label}</Typography>
                                      <Typography variant="caption" color="text.secondary">{item.description}</Typography>
                                    </Box>
                                  </Stack>
                                </Button>
                              </Grid>
                            ))}
                          </Grid>
                        </SectionCard>
                      </Grid>

                      <Grid item xs={12} md={5}>
                        <SectionCard
                          title="Últimos lançamentos"
                          action={
                            <Button size="small" endIcon={<MenuBookIcon />} onClick={() => setView('notas')}>
                              Ver boletim
                            </Button>
                          }
                        >
                          {ultimasNotas.length === 0 ? (
                            <EmptyState icon={<AssessmentIcon />} text="Nenhuma nota lançada ainda." />
                          ) : (
                            <Stack spacing={1}>
                              {ultimasNotas.map((n) => renderNotaRow(n))}
                            </Stack>
                          )}
                        </SectionCard>
                      </Grid>
                    </Grid>
                  </Box>
                )}

                {/* ALUNOS */}
                {view === 'alunos' && (
                  <Box>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1.5} sx={{ mb: 2.5 }}>
                      <Box>
                        <Typography variant="h5">Cadastro de Alunos</Typography>
                        {editingAlunoId && (
                          <Chip
                            size="small"
                            icon={<EditIcon />}
                            label="Modo edição"
                            onDelete={() => { setEditingAlunoId(null); setForm(initialForm); }}
                            color="primary"
                            variant="outlined"
                            sx={{ mt: 1, fontWeight: 600 }}
                          />
                        )}
                      </Box>
                    </Stack>

                    <SectionCard title={editingAlunoId ? 'Editar dados do aluno' : 'Novo aluno'}>
                      <form onSubmit={handleSubmit}>
                        <Grid container spacing={2.5}>
                          <Grid item xs={12} md={6}>
                            <TextField fullWidth label="Nome" name="nome" value={form.nome} onChange={handleChange} required />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField fullWidth label="E-mail" name="email" type="email" value={form.email} onChange={handleChange} required />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField fullWidth label="Data de nascimento" name="data_nascimento" type="date" value={form.data_nascimento} onChange={handleChange} InputLabelProps={{ shrink: true }} required />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              select
                              fullWidth
                              label="Turma / Série"
                              name="turma_id"
                              value={form.turma_id || ''}
                              onChange={(e) => {
                                const turmaId = e.target.value;
                                const turmaEncontrada = turmas.find((t) => String(t.id) === String(turmaId));
                                setForm({
                                  ...form,
                                  turma_id: turmaId,
                                  serie: turmaEncontrada ? turmaEncontrada.serie : '',
                                });
                              }}
                              required
                            >
                              {turmas.length === 0 ? (
                                <MenuItem disabled value="">Nenhuma turma cadastrada</MenuItem>
                              ) : (
                                turmas.map((t) => (
                                  <MenuItem key={t.id} value={t.id}>
                                    {t.nome} ({t.serie} - {t.ano})
                                  </MenuItem>
                                ))
                              )}
                            </TextField>
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <TextField fullWidth label="CPF" name="cpf" value={form.cpf} onChange={handleChange} />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <TextField fullWidth label="Telefone" name="telefone" value={form.telefone} onChange={handleChange} />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <TextField fullWidth label="Endereço" name="endereco" value={form.endereco} onChange={handleChange} />
                          </Grid>
                        </Grid>

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 3 }}>
                          <Button type="submit" variant="contained" startIcon={<AddIcon />} sx={{ px: 4, py: 1.1, borderRadius: 3 }}>
                            {editingAlunoId ? 'Atualizar aluno' : 'Salvar aluno'}
                          </Button>
                          <Button
                            variant="text"
                            color="inherit"
                            sx={{ px: 3, borderRadius: 3 }}
                            startIcon={<CloseIcon />}
                            onClick={() => { setForm(initialForm); setEditingAlunoId(null); }}
                          >
                            {editingAlunoId ? 'Cancelar edição' : 'Limpar'}
                          </Button>
                        </Stack>
                      </form>
                    </SectionCard>

                    <SectionCard
                      title={`Alunos Cadastrados (${alunosFiltrados.length})`}
                      action={<SearchField placeholder="Pesquisar aluno..." value={searchAluno} onChange={(e) => setSearchAluno(e.target.value)} />}
                    >
                      {alunosFiltrados.length === 0 ? (
                        <EmptyState icon={<PeopleIcon />} text="Nenhum aluno encontrado." />
                      ) : (
                        <TableContainer sx={{ borderRadius: 3, border: '1px solid', borderColor: 'grey.200' }}>
                          <Table size="small">
                            <TableHead sx={{ bgcolor: 'grey.50' }}>
                              <TableRow>
                                <TableCell sx={{ fontWeight: 700 }}>Aluno</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>E-mail</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Turma</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 700 }}>Ações</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {alunosFiltrados.map((aluno) => (
                                <TableRow key={aluno.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                  <TableCell>
                                    <Stack direction="row" spacing={1.5} alignItems="center">
                                      <Avatar sx={{ width: 34, height: 34, bgcolor: 'primary.50', color: 'primary.main', fontSize: 13, fontWeight: 700 }}>
                                        {getInitials(aluno.nome)}
                                      </Avatar>
                                      <Typography fontWeight={600}>{aluno.nome}</Typography>
                                    </Stack>
                                  </TableCell>
                                  <TableCell color="text.secondary">{aluno.email}</TableCell>
                                  <TableCell>
                                    <Chip label={turmas.find((t) => t.id === aluno.turma_id)?.nome || aluno.serie || '—'} size="small" variant="outlined" sx={{ borderColor: 'grey.300' }} />
                                  </TableCell>
                                  <TableCell align="right">
                                    <Tooltip title="Editar">
                                      <IconButton color="primary" onClick={() => handleEditAluno(aluno)} size="small" sx={{ mr: 0.5 }}>
                                        <EditIcon fontSize="small" />
                                      </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Excluir">
                                      <IconButton color="error" onClick={() => askDeleteAluno(aluno.id)} size="small">
                                        <DeleteIcon fontSize="small" />
                                      </IconButton>
                                    </Tooltip>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      )}
                    </SectionCard>
                  </Box>
                )}

                {/* TURMAS */}
                {view === 'turmas' && (
                  <Box>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1.5} sx={{ mb: 2.5 }}>
                      <Box>
                        <Typography variant="h5">Cadastro de Turmas</Typography>
                        {editingTurmaId && (
                          <Chip
                            size="small"
                            icon={<EditIcon />}
                            label="Modo edição"
                            onDelete={() => { setEditingTurmaId(null); setTurmaForm(initialTurmaForm); }}
                            color="primary"
                            variant="outlined"
                            sx={{ mt: 1, fontWeight: 600 }}
                          />
                        )}
                      </Box>
                    </Stack>

                    <SectionCard title={editingTurmaId ? 'Editar turma' : 'Nova turma'}>
                      <form onSubmit={handleTurmaSubmit}>
                        <Grid container spacing={2.5}>
                          <Grid item xs={12} md={4}>
                            <TextField fullWidth label="Nome da Turma" name="nome" value={turmaForm.nome} onChange={handleTurmaChange} placeholder="Ex.: 3º DS" required />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <TextField select fullWidth label="Série" name="serie" value={turmaForm.serie} onChange={handleTurmaChange} required>
                              {seriesOptions.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                            </TextField>
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <TextField fullWidth label="Ano Letivo" name="ano" type="number" value={turmaForm.ano} onChange={handleTurmaChange} placeholder="2026" required />
                          </Grid>
                        </Grid>

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 3 }}>
                          <Button type="submit" variant="contained" startIcon={<AddIcon />} sx={{ px: 4, py: 1.1, borderRadius: 3 }}>
                            {editingTurmaId ? 'Atualizar turma' : 'Salvar turma'}
                          </Button>
                          <Button
                            variant="text"
                            color="inherit"
                            sx={{ px: 3, borderRadius: 3 }}
                            startIcon={<CloseIcon />}
                            onClick={() => { setTurmaForm(initialTurmaForm); setEditingTurmaId(null); }}
                          >
                            {editingTurmaId ? 'Cancelar edição' : 'Limpar'}
                          </Button>
                        </Stack>
                      </form>
                    </SectionCard>

                    <SectionCard
                      title={`Turmas Cadastradas (${turmasFiltradas.length})`}
                      action={<SearchField placeholder="Pesquisar turma..." value={searchTurma} onChange={(e) => setSearchTurma(e.target.value)} />}
                    >
                      {turmasFiltradas.length === 0 ? (
                        <EmptyState icon={<ClassIcon />} text="Nenhuma turma encontrada." />
                      ) : (
                        <Grid container spacing={2}>
                          {turmasFiltradas.map((turma) => (
                            <Grid item xs={12} sm={6} md={4} key={turma.id}>
                              <motion.div whileHover={{ y: -4 }}>
                                <Card variant="outlined" sx={{ borderColor: 'grey.200', height: '100%' }}>
                                  <CardContent>
                                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                                      <Avatar variant="rounded" sx={{ bgcolor: 'rgba(245,158,11,0.12)', color: 'warning.main', borderRadius: 2.5 }}>
                                        <ClassIcon />
                                      </Avatar>
                                      <Box>
                                        <Tooltip title="Editar">
                                          <IconButton size="small" color="primary" onClick={() => handleEditTurma(turma)}>
                                            <EditIcon fontSize="small" />
                                          </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Excluir">
                                          <IconButton size="small" color="error" onClick={() => askDeleteTurma(turma.id)}>
                                            <DeleteIcon fontSize="small" />
                                          </IconButton>
                                        </Tooltip>
                                      </Box>
                                    </Stack>
                                    <Typography variant="h6" mt={1.5}>{turma.nome}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      {turma.serie} • Ano {turma.ano}
                                    </Typography>
                                    <Stack direction="row" spacing={1} mt={2}>
                                      <Chip size="small" icon={<PeopleIcon />} label={`${turma.alunos?.length ?? 0} alunos`} sx={{ bgcolor: 'rgba(79,70,229,0.08)', color: 'primary.main', fontWeight: 600 }} />
                                      <Chip size="small" label={turma.serie} variant="outlined" sx={{ borderColor: 'grey.300' }} />
                                    </Stack>
                                  </CardContent>
                                </Card>
                              </motion.div>
                            </Grid>
                          ))}
                        </Grid>
                      )}
                    </SectionCard>
                  </Box>
                )}

                {/* DISCIPLINAS */}
                {view === 'disciplinas' && (
                  <Box>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1.5} sx={{ mb: 2.5 }}>
                      <Box>
                        <Typography variant="h5">Cadastro de Disciplinas</Typography>
                        {editingDisciplinaId && (
                          <Chip
                            size="small"
                            icon={<EditIcon />}
                            label="Modo edição"
                            onDelete={() => { setEditingDisciplinaId(null); setDisciplinaForm(initialDisciplinaForm); }}
                            color="primary"
                            variant="outlined"
                            sx={{ mt: 1, fontWeight: 600 }}
                          />
                        )}
                      </Box>
                    </Stack>

                    <SectionCard title={editingDisciplinaId ? 'Editar disciplina' : 'Nova disciplina'}>
                      <form onSubmit={handleDisciplinaSubmit}>
                        <Grid container spacing={2.5}>
                          <Grid item xs={12} md={5}>
                            <TextField fullWidth label="Nome da Disciplina" name="nome" value={disciplinaForm.nome} onChange={handleDisciplinaChange} placeholder="Ex.: Matematica" required />
                          </Grid>
                          <Grid item xs={12} md={7}>
                            <TextField fullWidth label="Descrição (opcional)" name="descricao" value={disciplinaForm.descricao} onChange={handleDisciplinaChange} placeholder="Ex.: Algebra, geometria e aritmetica" />
                          </Grid>
                        </Grid>

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 3 }}>
                          <Button type="submit" variant="contained" startIcon={<AddIcon />} sx={{ px: 4, py: 1.1, borderRadius: 3 }}>
                            {editingDisciplinaId ? 'Atualizar disciplina' : 'Salvar disciplina'}
                          </Button>
                          <Button
                            variant="text"
                            color="inherit"
                            sx={{ px: 3, borderRadius: 3 }}
                            startIcon={<CloseIcon />}
                            onClick={() => { setDisciplinaForm(initialDisciplinaForm); setEditingDisciplinaId(null); }}
                          >
                            {editingDisciplinaId ? 'Cancelar edição' : 'Limpar'}
                          </Button>
                        </Stack>
                      </form>
                    </SectionCard>

                    <SectionCard
                      title={`Disciplinas Cadastradas (${disciplinasFiltradas.length})`}
                      action={<SearchField placeholder="Pesquisar disciplina..." value={searchDisciplina} onChange={(e) => setSearchDisciplina(e.target.value)} />}
                    >
                      {disciplinasFiltradas.length === 0 ? (
                        <EmptyState icon={<MenuBookIcon />} text="Nenhuma disciplina encontrada." />
                      ) : (
                        <TableContainer sx={{ borderRadius: 3, border: '1px solid', borderColor: 'grey.200' }}>
                          <Table size="small">
                            <TableHead sx={{ bgcolor: 'grey.50' }}>
                              <TableRow>
                                <TableCell sx={{ fontWeight: 700 }}>Disciplina</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Descrição</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 700 }}>Ações</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {disciplinasFiltradas.map((disciplina) => (
                                <TableRow key={disciplina.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                  <TableCell>
                                    <Stack direction="row" spacing={1.5} alignItems="center">
                                      <Avatar sx={{ width: 34, height: 34, bgcolor: 'rgba(6,182,212,0.12)', color: 'secondary.main', fontSize: 13, fontWeight: 700 }}>
                                        <MenuBookIcon fontSize="small" />
                                      </Avatar>
                                      <Typography fontWeight={600}>{disciplina.nome}</Typography>
                                    </Stack>
                                  </TableCell>
                                  <TableCell color="text.secondary">{disciplina.descricao || '—'}</TableCell>
                                  <TableCell align="right">
                                    <Tooltip title="Editar">
                                      <IconButton color="primary" onClick={() => handleEditDisciplina(disciplina)} size="small" sx={{ mr: 0.5 }}>
                                        <EditIcon fontSize="small" />
                                      </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Excluir">
                                      <IconButton color="error" onClick={() => askDeleteDisciplina(disciplina.id)} size="small">
                                        <DeleteIcon fontSize="small" />
                                      </IconButton>
                                    </Tooltip>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      )}
                    </SectionCard>
                  </Box>
                )}

                {/* NOTAS */}
                {view === 'notas' && (
                  <Box>
                    <Typography variant="h5" sx={{ mb: 2.5 }}>
                      Lançamento de Notas e Boletim Digital
                    </Typography>

                    <SectionCard title="Nova nota">
                      <form onSubmit={handleNotaSubmit}>
                        <Grid container spacing={2.5}>
                          <Grid item xs={12} md={4}>
                            <TextField select fullWidth label="Aluno" name="aluno_id" value={notaForm.aluno_id} onChange={handleNotaChange} required>
                              {alunos.length === 0 ? (
                                <MenuItem disabled value="">Nenhum aluno cadastrado</MenuItem>
                              ) : (
                                alunos.map((a) => <MenuItem key={a.id} value={a.id}>{a.nome}</MenuItem>)
                              )}
                            </TextField>
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <TextField select fullWidth label="Disciplina" name="disciplina" value={notaForm.disciplina} onChange={handleNotaChange} required>
                              {disciplinas.length === 0 ? (
                                <MenuItem disabled value="">Nenhuma disciplina cadastrada</MenuItem>
                              ) : (
                                disciplinas.map((d) => <MenuItem key={d.id} value={d.id}>{d.nome}</MenuItem>)
                              )}
                            </TextField>
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <TextField select fullWidth label="Bimestre" name="bimestre" value={notaForm.bimestre} onChange={handleNotaChange} required>
                              <MenuItem value={1}>1° Bimestre</MenuItem>
                              <MenuItem value={2}>2° Bimestre</MenuItem>
                              <MenuItem value={3}>3° Bimestre</MenuItem>
                              <MenuItem value={4}>4° Bimestre</MenuItem>
                            </TextField>
                          </Grid>
                          <Grid item xs={12} md={2}>
                            <TextField fullWidth label="Nota" name="nota" type="number" inputProps={{ step: '0.1', min: '0', max: '10' }} value={notaForm.nota} onChange={handleNotaChange} required />
                          </Grid>
                        </Grid>

                        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                          <Button type="submit" variant="contained" startIcon={<AddIcon />} sx={{ px: 4, py: 1.1, borderRadius: 3 }}>
                            Salvar Nota
                          </Button>
                          <Button variant="text" color="inherit" startIcon={<CloseIcon />} sx={{ px: 3, borderRadius: 3 }} onClick={() => setNotaForm(initialNotaForm)}>
                            Limpar
                          </Button>
                        </Stack>
                      </form>
                    </SectionCard>

                    <Grid container spacing={3} sx={{ mb: 3 }}>
                      <Grid item xs={12} md={4}>
                        <Card sx={{ height: '100%' }}>
                          <CardContent>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                              Filtrar por aluno
                            </Typography>
                            <TextField select fullWidth label="Aluno" value={filtroAlunoId} onChange={(e) => setFiltroAlunoId(e.target.value)}>
                              <MenuItem value="">Todos os Alunos</MenuItem>
                              {alunos.map((a) => <MenuItem key={a.id} value={a.id}>{a.nome}</MenuItem>)}
                            </TextField>
                          </CardContent>
                        </Card>
                      </Grid>

                      <Grid item xs={12} md={8}>
                        <Card sx={{ height: '100%' }}>
                          <CardContent>
                            {mediaBoletim === null ? (
                              <EmptyState icon={<AssessmentIcon />} text="Sem notas para calcular." />
                            ) : (
                              <>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1.5}>
                                  <Box>
                                    <Typography variant="body2" color="text.secondary">Média {'Geral'}</Typography>
                                    <Stack direction="row" alignItems="baseline" spacing={1}>
                                      <Typography variant="h3" fontWeight={800}>{mediaBoletim.toFixed(1)}</Typography>
                                      <Typography color="text.secondary">/ 10</Typography>
                                    </Stack>
                                  </Box>
                                  <Chip label={situacao.texto} sx={{ bgcolor: situacao.bg, color: situacao.cor, fontWeight: 800, fontSize: '0.95rem', px: 1 }} />
                                </Stack>
                                <LinearProgress
                                  variant="determinate"
                                  value={Math.min(Number(mediaBoletim) * 10, 100)}
                                  color={situacao.progressColor}
                                  sx={{ height: 10, borderRadius: 6, mt: 2 }}
                                />
                              </>
                            )}
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>

                    <SectionCard title={`Notas Cadastradas (${notasFiltradasBoletim.length})`}>
                      {notasFiltradasBoletim.length === 0 ? (
                        <EmptyState icon={<AssessmentIcon />} text="Nenhuma nota lançada até o momento." />
                      ) : (
                        <Stack spacing={1.5}>
                          {notasFiltradasBoletim.map(renderNotaRow)}
                        </Stack>
                      )}
                    </SectionCard>
                  </Box>
                )}

                {/* CHAMADA / FREQUÊNCIA */}
                {view === 'frequencia' && (
                  <Box>
                    <Typography variant="h5" sx={{ mb: 2.5 }}>
                      Registro de Frequência
                    </Typography>

                    <SectionCard title="Registrar chamada">
                      <form onSubmit={handleFrequenciaSubmit}>
                        <Grid container spacing={2.5}>
                          <Grid item xs={12} md={5}>
                            <TextField
                              select
                              fullWidth
                              label="Aluno"
                              name="aluno_id"
                              value={frequenciaForm.aluno_id}
                              onChange={handleFrequenciaChange}
                              required
                            >
                              {alunos.length === 0 ? (
                                <MenuItem disabled value="">Nenhum aluno cadastrado</MenuItem>
                              ) : (
                                alunos.map((aluno) => (
                                  <MenuItem key={aluno.id} value={aluno.id}>
                                    {aluno.nome}
                                  </MenuItem>
                                ))
                              )}
                            </TextField>
                          </Grid>

                          <Grid item xs={12} sm={6} md={3}>
                            <TextField
                              fullWidth
                              label="Data"
                              name="data_aula"
                              type="date"
                              value={frequenciaForm.data_aula}
                              onChange={handleFrequenciaChange}
                              InputLabelProps={{ shrink: true }}
                              required
                            />
                          </Grid>

                          <Grid item xs={12} sm={6} md={4}>
                            <TextField
                              select
                              fullWidth
                              label="Presente"
                              name="presente"
                              value={frequenciaForm.presente}
                              onChange={(e) => setFrequenciaForm({ ...frequenciaForm, presente: e.target.value === 'true' })}
                              required
                            >
                              <MenuItem value="true">Sim</MenuItem>
                              <MenuItem value="false">Não</MenuItem>
                            </TextField>
                          </Grid>
                        </Grid>

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 3 }}>
                          <Button
                            type="submit"
                            variant="contained"
                            startIcon={<HowToRegIcon />}
                            sx={{ px: 4, py: 1.1, borderRadius: 3 }}
                          >
                            Registrar
                          </Button>
                          <Button
                            type="button"
                            variant="text"
                            color="inherit"
                            startIcon={<CloseIcon />}
                            sx={{ px: 3, borderRadius: 3 }}
                            onClick={() => setFrequenciaForm(initialFrequenciaForm)}
                          >
                            Limpar
                          </Button>
                        </Stack>
                      </form>
                    </SectionCard>

                    <SectionCard title={`Presenças Registradas (${frequencias.length})`}>
                      {frequencias.length === 0 ? (
                        <EmptyState
                          icon={<HowToRegIcon />}
                          text="Nenhum registro de frequência até o momento."
                        />
                      ) : (
                        <TableContainer sx={{ borderRadius: 3, border: '1px solid', borderColor: 'grey.200' }}>
                          <Table size="small">
                            <TableHead sx={{ bgcolor: 'grey.50' }}>
                              <TableRow>
                                <TableCell sx={{ fontWeight: 700 }}>Aluno</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Data</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Presente</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {[...frequencias].reverse().map((registro) => {
                                const aluno = alunos.find((a) => Number(a.id) === Number(registro.aluno_id));
                                const presente = String(registro.presente).toLowerCase() === 'sim' ||
                                  registro.presente === true ||
                                  registro.presente === 1;

                                return (
                                  <TableRow
                                    key={registro.id}
                                    hover
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                  >
                                    <TableCell>
                                      <Stack direction="row" spacing={1.5} alignItems="center">
                                        <Avatar
                                          sx={{
                                            width: 34,
                                            height: 34,
                                            bgcolor: presente ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
                                            color: presente ? 'success.main' : 'error.main',
                                            fontSize: 13,
                                            fontWeight: 700,
                                          }}
                                        >
                                          {getInitials(aluno?.nome)}
                                        </Avatar>
                                        <Typography fontWeight={600}>
                                          {aluno?.nome || registro.aluno_nome || 'Aluno não localizado'}
                                        </Typography>
                                      </Stack>
                                    </TableCell>
                                    <TableCell>{formatarData(registro.data_aula || registro.data)}</TableCell>
                                    <TableCell>
                                      <Chip
                                        label={presente ? 'Sim' : 'Não'}
                                        size="small"
                                        color={presente ? 'success' : 'error'}
                                        variant="outlined"
                                        sx={{ fontWeight: 700 }}
                                      />
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      )}
                    </SectionCard>
                  </Box>
                )}

                {/* PROFESSORES */}
                {view === 'professores' && (
                  <Box>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1.5} sx={{ mb: 2.5 }}>
                      <Box>
                        <Typography variant="h5">Cadastro de Professores</Typography>
                        {editingProfessorId && (
                          <Chip
                            size="small"
                            icon={<EditIcon />}
                            label="Modo edição"
                            onDelete={() => { setEditingProfessorId(null); setProfessorForm(initialProfessorForm); }}
                            color="primary"
                            variant="outlined"
                            sx={{ mt: 1, fontWeight: 600 }}
                          />
                        )}
                      </Box>
                    </Stack>

                    <SectionCard title={editingProfessorId ? 'Editar dados do professor' : 'Novo professor'}>
                      <form onSubmit={handleProfessorSubmit}>
                        <Grid container spacing={2.5}>
                          <Grid item xs={12} md={6}>
                            <TextField fullWidth label="Nome" name="nome" value={professorForm.nome} onChange={handleProfessorChange} placeholder="Ex.: Maria Souza" required />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField fullWidth label="E-mail" name="email" type="email" value={professorForm.email} onChange={handleProfessorChange} placeholder="exemplo@escola.com" required />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField fullWidth label="Telefone" name="telefone" value={professorForm.telefone} onChange={handleProfessorChange} placeholder="(11) 99999-0000" />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              select
                              fullWidth
                              label="Turma (opcional)"
                              name="turma_id"
                              value={professorForm.turma_id || ''}
                              onChange={handleProfessorChange}
                            >
                              <MenuItem value="">Sem turma</MenuItem>
                              {turmas.map((t) => (
                                <MenuItem key={t.id} value={t.id}>
                                  {t.nome} ({t.serie} - {t.ano})
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              select
                              fullWidth
                              label="Disciplinas"
                              name="disciplina_ids"
                              value={professorForm.disciplina_ids}
                              onChange={(e) =>
                                setProfessorForm({ ...professorForm, disciplina_ids: e.target.value })
                              }
                              SelectProps={{ multiple: true, renderValue: (selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                  {selected.map((id) => {
                                    const disc = disciplinas.find((d) => d.id === Number(id));
                                    return (
                                      <Chip
                                        key={id}
                                        size="small"
                                        label={disc ? disc.nome : id}
                                        sx={{ bgcolor: 'rgba(79,70,229,0.1)', color: 'primary.main', fontWeight: 600 }}
                                      />
                                    );
                                  })}
                                </Box>
                              )}}
                            >
                              {disciplinas.length === 0 ? (
                                <MenuItem disabled value="">Nenhuma disciplina cadastrada</MenuItem>
                              ) : (
                                disciplinas.map((d) => (
                                  <MenuItem key={d.id} value={d.id}>
                                    {d.nome}
                                  </MenuItem>
                                ))
                              )}
                            </TextField>
                          </Grid>
                        </Grid>

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 3 }}>
                          <Button type="submit" variant="contained" startIcon={<AddIcon />} sx={{ px: 4, py: 1.1, borderRadius: 3 }}>
                            {editingProfessorId ? 'Atualizar professor' : 'Salvar professor'}
                          </Button>
                          <Button
                            variant="text"
                            color="inherit"
                            sx={{ px: 3, borderRadius: 3 }}
                            startIcon={<CloseIcon />}
                            onClick={() => { setProfessorForm(initialProfessorForm); setEditingProfessorId(null); }}
                          >
                            {editingProfessorId ? 'Cancelar edição' : 'Limpar'}
                          </Button>
                        </Stack>
                      </form>
                    </SectionCard>

                    <SectionCard
                      title={`Professores Cadastrados (${professoresFiltrados.length})`}
                      action={<SearchField placeholder="Pesquisar professor..." value={searchProfessor} onChange={(e) => setSearchProfessor(e.target.value)} />}
                    >
                      {professoresFiltrados.length === 0 ? (
                        <EmptyState icon={<SupervisorAccountIcon />} text="Nenhum professor encontrado." />
                      ) : (
                        <TableContainer sx={{ borderRadius: 3, border: '1px solid', borderColor: 'grey.200' }}>
                          <Table size="small">
                            <TableHead sx={{ bgcolor: 'grey.50' }}>
                              <TableRow>
                                <TableCell sx={{ fontWeight: 700 }}>Professor</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Contato</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Turma</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Disciplinas</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 700 }}>Ações</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {professoresFiltrados.map((professor) => (
                                <TableRow key={professor.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                  <TableCell>
                                    <Stack direction="row" spacing={1.5} alignItems="center">
                                      <Avatar sx={{ width: 34, height: 34, bgcolor: 'rgba(79,70,229,0.1)', color: 'primary.main', fontSize: 13, fontWeight: 700 }}>
                                        {getInitials(professor.nome)}
                                      </Avatar>
                                      <Typography fontWeight={600}>{professor.nome}</Typography>
                                    </Stack>
                                  </TableCell>
                                  <TableCell>
                                    <Typography variant="body2">{professor.email || '—'}</Typography>
                                    <Typography variant="caption" color="text.secondary">{professor.telefone || ''}</Typography>
                                  </TableCell>
                                  <TableCell>
                                    <Chip label={turmas.find((t) => t.id === professor.turma_id)?.nome || professor.turma?.nome || '—'} size="small" variant="outlined" sx={{ borderColor: 'grey.300' }} />
                                  </TableCell>
                                  <TableCell>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, maxWidth: 280 }}>
                                      {(professor.disciplinas || []).length === 0 ? (
                                        <Typography variant="caption" color="text.secondary">—</Typography>
                                      ) : (
                                        professor.disciplinas.map((d) => (
                                          <Chip key={d.id} size="small" label={d.nome} sx={{ bgcolor: 'rgba(6,182,212,0.1)', color: 'secondary.main', fontWeight: 600 }} />
                                        ))
                                      )}
                                    </Box>
                                  </TableCell>
                                  <TableCell align="right">
                                    <Tooltip title="Editar">
                                      <IconButton color="primary" onClick={() => handleEditProfessor(professor)} size="small" sx={{ mr: 0.5 }}>
                                        <EditIcon fontSize="small" />
                                      </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Excluir">
                                      <IconButton color="error" onClick={() => askDeleteProfessor(professor.id)} size="small">
                                        <DeleteIcon fontSize="small" />
                                      </IconButton>
                                    </Tooltip>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      )}
                    </SectionCard>
                  </Box>
                )}

                {/* OUTRAS TELAS */}
                {['financeiro', 'relatorios'].includes(view) && (
                  <Paper sx={{ p: 5, borderRadius: 5, textAlign: 'center' }}>
                    <Avatar sx={{ bgcolor: 'primary.50', color: 'primary.main', width: 64, height: 64, mx: 'auto', mb: 2 }}>
                      {menuItems.find((i) => i.key === view)?.icon}
                    </Avatar>
                    <Typography variant="h6" gutterBottom>
                      {menuItems.find((i) => i.key === view)?.label}
                    </Typography>
                    <Typography color="text.secondary" maxWidth={420} mx="auto">
                      Esta área ficará disponível na próxima etapa do sistema escolar.
                    </Typography>
                  </Paper>
                )}

              </motion.div>
            </AnimatePresence>
          </Container>
        </Box>

        {/* DIÁLOGO DE CONFIRMAÇÃO */}
        <ConfirmDialog
          open={Boolean(pendingDelete)}
          title={pendingDelete?.title || ''}
          description={pendingDelete?.description || ''}
          onCancel={() => setPendingDelete(null)}
          onConfirm={confirmDelete}
        />

        {/* NOTIFICAÇÕES */}
        <Snackbar
          open={snack.open}
          autoHideDuration={3500}
          onClose={closeSnack}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          TransitionComponent={Slide}
          TransitionProps={{ direction: 'left' }}
        >
          <Alert
            onClose={closeSnack}
            severity={snack.severity}
            variant="filled"
            sx={{ borderRadius: 3, boxShadow: '0 12px 30px rgba(15,23,42,0.25)', minWidth: 280 }}
          >
            {snack.message}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}

export default App;