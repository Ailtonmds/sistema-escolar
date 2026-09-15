import React, { useEffect, useState } from 'react';

import {
  Alert,
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  Container,
  CssBaseline,
  Divider,
  Drawer,
  Grid,
  IconButton,
  InputAdornment,
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

import {
  ThemeProvider,
  createTheme,
} from '@mui/material/styles';

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
import HowToRegIcon from '@mui/icons-material/HowToReg';
<<<<<<< HEAD
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import HistoryIcon from '@mui/icons-material/History';
import Slide from '@mui/material/Slide';
=======
>>>>>>> 5e17166b457a131b5979e10576926edb3ca24c35

const API_BASE_URL = '';
const AUTH_TOKEN_KEY = 'escola_auth_token';

const drawerWidth = 260;

/* =========================
   TEMA
========================= */

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4f46e5',
    },
    secondary: {
      main: '#06b6d4',
    },
    success: {
      main: '#10b981',
    },
    warning: {
      main: '#f59e0b',
    },
    error: {
      main: '#ef4444',
    },
    background: {
      default: '#f4f6fb',
      paper: '#ffffff',
    },
  },

  shape: {
    borderRadius: 12,
  },

  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',

    h4: {
      fontWeight: 800,
    },

    h5: {
      fontWeight: 800,
    },

    h6: {
      fontWeight: 700,
    },

    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
});

/* =========================
   FORMULÁRIOS
========================= */

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

const initialChamadaForm = {
  disciplina_id: '',
  data_aula: new Date().toISOString().split('T')[0],
  quantidade_aulas: 1,
  titulo_plano: '',
};

<<<<<<< HEAD
const menuItems = [
  { key: 'dashboard', label: 'Início', description: 'Visão geral do sistema', icon: <DashboardIcon /> },
  { key: 'alunos', label: 'Alunos', description: 'Cadastro e consulta de estudantes', icon: <PeopleIcon /> },
  { key: 'turmas', label: 'Turmas', description: 'Organização escolar', icon: <ClassIcon /> },
  { key: 'disciplinas', label: 'Disciplinas', description: 'Matérias e currículo', icon: <MenuBookIcon /> },
  { key: 'notas', label: 'Notas / Boletim', description: 'Lançamento e consulta de notas', icon: <AssessmentIcon /> },
  { key: 'frequencia', label: 'Chamada', description: 'Registro de frequência dos alunos', icon: <HowToRegIcon /> },
  { key: 'chamada', label: 'Fazer Chamada', description: 'Chamada da minha disciplina', icon: <HowToRegIcon /> },
  { key: 'professores', label: 'Professores', description: 'Gestão da equipe', icon: <SupervisorAccountIcon /> },
  { key: 'auditoria', label: 'Auditoria', description: 'Registros de operações sensíveis', icon: <HistoryIcon /> },
  { key: 'financeiro', label: 'Financeiro', description: 'Mensalidades e contas', icon: <AttachMoneyIcon /> },
  { key: 'relatorios', label: 'Relatórios', description: 'Indicadores da escola', icon: <BarChartIcon /> },
];

=======
>>>>>>> 5e17166b457a131b5979e10576926edb3ca24c35
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
  usuario: '',
  senha: '',
  perfil: 'professor',
};

/* =========================
   MENU
========================= */

const menuItems = [
  {
    key: 'dashboard',
    label: 'Início',
    icon: <DashboardIcon />,
  },
  {
    key: 'alunos',
    label: 'Alunos',
    icon: <PeopleIcon />,
  },
  {
    key: 'turmas',
    label: 'Turmas',
    icon: <ClassIcon />,
  },
  {
    key: 'disciplinas',
    label: 'Disciplinas',
    icon: <MenuBookIcon />,
  },
  {
    key: 'notas',
    label: 'Notas / Boletim',
    icon: <AssessmentIcon />,
  },
  {
    key: 'frequencia',
    label: 'Frequência',
    icon: <HowToRegIcon />,
  },
  {
    key: 'chamada',
    label: 'Fazer Chamada',
    icon: <HowToRegIcon />,
  },
  {
    key: 'professores',
    label: 'Professores',
    icon: <SupervisorAccountIcon />,
  },
  {
    key: 'financeiro',
    label: 'Financeiro',
    icon: <AttachMoneyIcon />,
  },
  {
    key: 'relatorios',
    label: 'Relatórios',
    icon: <BarChartIcon />,
  },
];

const bimestreMap = {
  1: '1º Bimestre',
  2: '2º Bimestre',
  3: '3º Bimestre',
  4: '4º Bimestre',
};

/* =========================
   FUNÇÕES AUXILIARES
========================= */

function getInitials(nome = '') {
  return nome
    .split(' ')
    .filter(Boolean)
    .map((item) => item[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function notaColor(nota) {
  if (nota >= 6) return 'success.main';
  if (nota >= 4) return 'warning.main';
  return 'error.main';
}

function formatarData(data) {
  if (!data) return '—';

  const partes = String(data)
    .split('T')[0]
    .split('-');

  if (partes.length !== 3) return data;

  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

/* =========================
   APP
========================= */

function App() {

  /* =========================
     ALUNOS
  ========================= */

  const [form, setForm] = useState(initialForm);
  const [alunos, setAlunos] = useState([]);
  const [editingAlunoId, setEditingAlunoId] = useState(null);
  const [searchAluno, setSearchAluno] = useState('');

  /* =========================
     TURMAS
  ========================= */

  const [turmaForm, setTurmaForm] = useState(initialTurmaForm);
  const [turmas, setTurmas] = useState([]);
  const [editingTurmaId, setEditingTurmaId] = useState(null);

  /* =========================
     NOTAS
  ========================= */

  const [notaForm, setNotaForm] = useState(initialNotaForm);
  const [notas, setNotas] = useState([]);

  /* =========================
     FREQUÊNCIA
  ========================= */

  const [frequenciaForm, setFrequenciaForm] = useState(
    initialFrequenciaForm
  );

  const [frequencias, setFrequencias] = useState([]);

  /* =========================
     AUTENTICAÇÃO
  ========================= */

  const [authToken, setAuthToken] = useState(null);
  const [professorLogado, setProfessorLogado] = useState(null);

  /* =========================
     CHAMADA
  ========================= */

  const [chamadaForm, setChamadaForm] = useState(
    initialChamadaForm
  );

  const [marcacoes, setMarcacoes] = useState({});

  /* =========================
     DISCIPLINAS
  ========================= */

  const [disciplinaForm, setDisciplinaForm] = useState(
    initialDisciplinaForm
  );

  const [disciplinas, setDisciplinas] = useState([]);

  /* =========================
     PROFESSORES
  ========================= */

  const [professorForm, setProfessorForm] = useState(
    initialProfessorForm
  );

  const [professores, setProfessores] = useState([]);

  /* =========================
     LOGIN / NAVEGAÇÃO
  ========================= */

  const [view, setView] = useState('dashboard');

  const [loggedIn, setLoggedIn] = useState(false);
<<<<<<< HEAD
  const [loginForm, setLoginForm] = useState({ email: '', senha: '' });
  const [anchorEl, setAnchorEl] = useState(null);

  const [editingNotaId, setEditingNotaId] = useState(null);
  const [editingFrequenciaId, setEditingFrequenciaId] = useState(null);

  const [auditoria, setAuditoria] = useState([]);
  const [auditoriaIndicadores, setAuditoriaIndicadores] = useState(null);
  const [auditoriaFiltros, setAuditoriaFiltros] = useState({
    busca: '',
    operacao: '',
    inicio: '',
    fim: '',
  });

  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });
  const [pendingDelete, setPendingDelete] = useState(null);
=======
  const [checkingSession, setCheckingSession] = useState(true);

  const [loginForm, setLoginForm] = useState({
    email: '',
    senha: '',
  });

  const [anchorEl, setAnchorEl] = useState(null);

  /* =========================
     NOTIFICAÇÕES
  ========================= */
>>>>>>> 5e17166b457a131b5979e10576926edb3ca24c35

  const [snack, setSnack] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const notify = (
    message,
    severity = 'success'
  ) => {
    setSnack({
      open: true,
      message,
      severity,
    });
  };

<<<<<<< HEAD
  const authedHeaders = (extra = {}) => ({
    'Content-Type': 'application/json',
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    ...extra,
  });
=======
  const closeSnack = () => {
    setSnack((prev) => ({
      ...prev,
      open: false,
    }));
  };

  /* =========================
     CARREGAR DADOS
  ========================= */
>>>>>>> 5e17166b457a131b5979e10576926edb3ca24c35

  const carregarAlunos = async () => {

    try {
<<<<<<< HEAD
      const response = await fetch(`${API_BASE_URL}/api/alunos`, { headers: authedHeaders() });
      if (!response.ok) throw new Error('Erro ao carregar alunos');
      setAlunos(await response.json());
=======

      const response = await fetch(
        `${API_BASE_URL}/api/alunos`
      );

      if (!response.ok) {
        throw new Error('Erro ao carregar alunos');
      }

      const data = await response.json();

      setAlunos(data);

>>>>>>> 5e17166b457a131b5979e10576926edb3ca24c35
    } catch (error) {

      console.error(error);

    }
  };

  const carregarTurmas = async () => {

    try {
<<<<<<< HEAD
      const response = await fetch(`${API_BASE_URL}/api/turmas`, { headers: authedHeaders() });
      if (!response.ok) throw new Error('Erro ao carregar turmas');
      setTurmas(await response.json());
=======

      const response = await fetch(
        `${API_BASE_URL}/api/turmas`
      );

      if (!response.ok) {
        throw new Error('Erro ao carregar turmas');
      }

      const data = await response.json();

      setTurmas(data);

>>>>>>> 5e17166b457a131b5979e10576926edb3ca24c35
    } catch (error) {

      console.error(error);

    }
  };

  const carregarNotas = async () => {

    try {
<<<<<<< HEAD
      const response = await fetch(`${API_BASE_URL}/api/notas`, { headers: authedHeaders() });
      if (!response.ok) throw new Error('Erro ao carregar notas');
      setNotas(await response.json());
=======

      const response = await fetch(
        `${API_BASE_URL}/api/notas`
      );

      if (!response.ok) {
        throw new Error('Erro ao carregar notas');
      }

      const data = await response.json();

      setNotas(data);

>>>>>>> 5e17166b457a131b5979e10576926edb3ca24c35
    } catch (error) {

      console.error(error);

    }
  };

  const carregarFrequencias = async () => {

    try {
<<<<<<< HEAD
      const response = await fetch(`${API_BASE_URL}/api/frequencias`, { headers: authedHeaders() });
      if (!response.ok) throw new Error('Erro ao carregar frequências');
      setFrequencias(await response.json());
=======

      const response = await fetch(
        `${API_BASE_URL}/api/frequencias`
      );

      if (!response.ok) {
        throw new Error(
          'Erro ao carregar frequências'
        );
      }

      const data = await response.json();

      setFrequencias(data);

>>>>>>> 5e17166b457a131b5979e10576926edb3ca24c35
    } catch (error) {

      console.error(error);

    }
  };

  const carregarDisciplinas = async () => {

    try {
<<<<<<< HEAD
      const response = await fetch(`${API_BASE_URL}/api/disciplinas`, { headers: authedHeaders() });
      if (!response.ok) throw new Error('Erro ao carregar disciplinas');
      setDisciplinas(await response.json());
=======

      const response = await fetch(
        `${API_BASE_URL}/api/disciplinas`
      );

      if (!response.ok) {
        throw new Error(
          'Erro ao carregar disciplinas'
        );
      }

      const data = await response.json();

      setDisciplinas(data);

>>>>>>> 5e17166b457a131b5979e10576926edb3ca24c35
    } catch (error) {

      console.error(error);

    }
  };

  const carregarProfessores = async () => {

    try {
<<<<<<< HEAD
      const response = await fetch(`${API_BASE_URL}/api/professores`, { headers: authedHeaders() });
      if (!response.ok) throw new Error('Erro ao carregar professores');
      setProfessores(await response.json());
=======

      const response = await fetch(
        `${API_BASE_URL}/api/professores`
      );

      if (!response.ok) {
        throw new Error(
          'Erro ao carregar professores'
        );
      }

      const data = await response.json();

      setProfessores(data);

>>>>>>> 5e17166b457a131b5979e10576926edb3ca24c35
    } catch (error) {

      console.error(error);

    }
  };

  const carregarAuditoria = async () => {
    try {
      const params = new URLSearchParams();
      if (auditoriaFiltros.busca) params.set('usuario', auditoriaFiltros.busca);
      if (auditoriaFiltros.operacao) params.set('operacao', auditoriaFiltros.operacao);
      if (auditoriaFiltros.inicio) params.set('inicio', auditoriaFiltros.inicio);
      if (auditoriaFiltros.fim) params.set('fim', auditoriaFiltros.fim);

      const response = await fetch(`${API_BASE_URL}/api/auditoria?${params.toString()}`, {
        headers: authedHeaders(),
      });
      if (!response.ok) throw new Error('Erro ao carregar auditoria');
      setAuditoria(await response.json());

      const responseIndicadores = await fetch(`${API_BASE_URL}/api/auditoria/indicadores`, {
        headers: authedHeaders(),
      });
      if (responseIndicadores.ok) {
        setAuditoriaIndicadores(await responseIndicadores.json());
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
<<<<<<< HEAD
    if (loggedIn) {
      carregarAlunos();
      carregarTurmas();
      carregarNotas();
      carregarFrequencias();
      carregarDisciplinas();
      carregarProfessores();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  useEffect(() => {
    if (view === 'auditoria' && loggedIn && professorLogado?.perfil === 'admin') {
      carregarAuditoria();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, auditoriaFiltros, loggedIn]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleTurmaChange = (e) => setTurmaForm({ ...turmaForm, [e.target.name]: e.target.value });
  const handleNotaChange = (e) => setNotaForm({ ...notaForm, [e.target.name]: e.target.value });
  const handleFrequenciaChange = (e) => setFrequenciaForm({ ...frequenciaForm, [e.target.name]: e.target.value });
  const handleLoginChange = (e) => setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  const handleChamadaChange = (e) => {
    const { name, value } = e.target;
    setChamadaForm((prev) => ({ ...prev, [name]: value }));
    if (name === 'quantidade_aulas') {
      setMarcacoes({});
    }
  };
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
      const url = editingFrequenciaId
        ? `${API_BASE_URL}/api/frequencias/${editingFrequenciaId}`
        : `${API_BASE_URL}/api/frequencias`;
      const response = await fetch(url, {
        method: editingFrequenciaId ? 'PUT' : 'POST',
        headers: authedHeaders(),
        body: JSON.stringify({
          aluno_id: parseInt(frequenciaForm.aluno_id),
          data_aula: frequenciaForm.data_aula,
          presente: frequenciaForm.presente,
        }),
      });

      if (!response.ok) {
        throw new Error('Falha ao salvar frequência.');
      }

      notify(editingFrequenciaId ? 'Frequência atualizada com sucesso!' : 'Frequência registrada com sucesso!');
      setEditingFrequenciaId(null);
      carregarFrequencias();

      setFrequenciaForm({
        ...initialFrequenciaForm,
        data_aula: frequenciaForm.data_aula,
      });
    } catch (error) {
      console.error(error);
      notify(editingFrequenciaId ? 'Erro ao atualizar frequência.' : 'Erro ao registrar frequência.', 'error');
    }
  };

  const formatarData = (data) => {
    if (!data) return '—';
    const partes = String(data).split('T')[0].split('-');
    if (partes.length !== 3) return data;
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    if (!loginForm.email || !loginForm.senha) {
      notify('Informe e-mail e senha.', 'error');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginForm.email, senha: loginForm.senha }),
      });

      if (!response.ok) {
        notify('Usuário ou senha inválidos.', 'error');
        return;
      }

      const data = await response.json();
      setAuthToken(data.token);
      setProfessorLogado(data.professor);
      setLoggedIn(true);
      setView(data.professor?.perfil === 'admin' ? 'dashboard' : 'chamada');
    } catch (error) {
      console.error(error);
      notify('Falha ao conectar com o servidor.', 'error');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setAuthToken(null);
    setProfessorLogado(null);
    setMarcacoes({});
    setView('dashboard');
    setLoginForm({ email: '', senha: '' });
    setAnchorEl(null);
    notify('Logout realizado.', 'success');
  };

  const quantidadeAulas = Math.max(1, Math.min(10, parseInt(chamadaForm.quantidade_aulas, 10) || 1));
=======

    const restaurarSessao = async () => {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);

      if (!token) {
        setCheckingSession(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error('Sessão inválida');
        }
>>>>>>> 5e17166b457a131b5979e10576926edb3ca24c35

        const data = await response.json();
        setAuthToken(token);
        setProfessorLogado(data.professor);
        setLoggedIn(true);
      } catch (error) {
        localStorage.removeItem(AUTH_TOKEN_KEY);
      } finally {
        setCheckingSession(false);
      }
    };

    restaurarSessao();

  }, []);

  useEffect(() => {

    if (!loggedIn) return;

    carregarAlunos();
    carregarTurmas();
    carregarNotas();
    carregarFrequencias();
    carregarDisciplinas();
    carregarProfessores();

  }, [loggedIn]);

  /* =========================
     HANDLERS
  ========================= */

  const handleChange = (event) => {

    const {
      name,
      value,
    } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

<<<<<<< HEAD
  const alunoTemFalta = (alunoId, numeroAula) => {
    return Boolean(marcacoes[`${alunoId}-${numeroAula}`]);
  };

  const handleSalvarChamada = async () => {
    if (!professorLogado) {
      notify('Professor nao identificado.', 'error');
      return;
    }

    if (!authToken) {
      notify('Sessao invalida. Faca login novamente.', 'error');
      return;
    }

    if (!chamadaForm.disciplina_id) {
      notify('Selecione a disciplina.', 'error');
      return;
    }

    if (!chamadaForm.data_aula) {
      notify('Informe a data da aula.', 'error');
      return;
    }

    if (!chamadaForm.quantidade_aulas) {
      notify('Informe a quantidade de aulas.', 'error');
      return;
    }

    if (alunosDaTurma.length === 0) {
      notify('A turma nao possui alunos cadastrados.', 'error');
      return;
    }

    const faltas = [];
    alunosDaTurma.forEach((aluno) => {
      for (let aula = 1; aula <= quantidadeAulas; aula += 1) {
        if (marcacoes[`${aluno.id}-${aula}`]) {
          faltas.push({ aluno_id: aluno.id, numero_aula: aula });
        }
      }
    });

    const dadosChamada = {
      turma_id: Number(professorLogado.turma_id),
      disciplina_id: Number(chamadaForm.disciplina_id),
      data_aula: chamadaForm.data_aula,
      quantidade_aulas: quantidadeAulas,
      titulo_plano: chamadaForm.titulo_plano,
      faltas,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/chamadas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(dadosChamada),
      });
=======
  const handleTurmaChange = (event) => {

    const {
      name,
      value,
    } = event.target;

    setTurmaForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNotaChange = (event) => {

    const {
      name,
      value,
    } = event.target;

    setNotaForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFrequenciaChange = (event) => {

    const {
      name,
      value,
    } = event.target;

    setFrequenciaForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginChange = (event) => {

    const {
      name,
      value,
    } = event.target;

    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChamadaChange = (event) => {

    const {
      name,
      value,
    } = event.target;

    setChamadaForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    /*
      Quando mudar a quantidade de aulas,
      limpamos as marcações antigas.
    */

    if (name === 'quantidade_aulas') {
      setMarcacoes({});
    }
  };

  const handleDisciplinaChange = (event) => {

    const {
      name,
      value,
    } = event.target;

    setDisciplinaForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfessorChange = (event) => {

    const {
      name,
      value,
    } = event.target;

    setProfessorForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================================================
     LOGIN
  ========================================================= */

  const handleLoginSubmit = async (event) => {

    event.preventDefault();

    if (!loginForm.email) {
      notify(
        'Informe o e-mail.',
        'error'
      );

      return;
    }

    if (!loginForm.senha) {
      notify(
        'Informe a senha.',
        'error'
      );

      return;
    }

    try {

      const response = await fetch(
        `${API_BASE_URL}/api/auth/login`,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          /*
            A API atual identifica o professor pelo campo "usuario".
            Enviamos o e-mail também e mantemos essa compatibilidade até
            que o back-end passe a autenticar diretamente por e-mail.
          */
          body: JSON.stringify({
            email: loginForm.email,
            usuario: loginForm.email,
            senha: loginForm.senha,
          }),
        }
      );

      const data =
        await response
          .json()
          .catch(() => null);
>>>>>>> 5e17166b457a131b5979e10576926edb3ca24c35

      const resultado = await response.json().catch(() => null);

      if (!response.ok) {
<<<<<<< HEAD
        throw new Error(resultado?.message || resultado?.error || 'Erro ao salvar chamada.');
=======

        notify(
          data?.message ||
          'Usuário ou senha inválidos.',
          'error'
        );

        return;
>>>>>>> 5e17166b457a131b5979e10576926edb3ca24c35
      }

      /*
        Salva token.
      */

      setAuthToken(data.token);
      localStorage.setItem(AUTH_TOKEN_KEY, data.token);

      /*
        Salva professor.
      */

      setProfessorLogado(data.professor);

      /*
        Usuário está logado.
      */

      setLoggedIn(true);

      setView('dashboard');

      notify(
        'Login realizado com sucesso!'
      );

    } catch (error) {
<<<<<<< HEAD
      console.error('Erro na chamada:', error);
      notify(error.message || 'Falha ao conectar com o servidor.', 'error');
=======

      console.error(error);

      notify(
        'Falha ao conectar com o servidor.',
        'error'
      );
>>>>>>> 5e17166b457a131b5979e10576926edb3ca24c35
    }
  };

  /* =========================================================
     LOGOUT
  ========================================================= */

  const handleLogout = () => {

    setLoggedIn(false);

    setAuthToken(null);
    localStorage.removeItem(AUTH_TOKEN_KEY);

    setProfessorLogado(null);

    setMarcacoes({});

    setView('dashboard');

    setLoginForm({
      email: '',
      senha: '',
    });

    setAnchorEl(null);

    notify(
      'Logout realizado.',
      'success'
    );
  };

  /* =========================================================
     CHAMADA
  ========================================================= */

  const quantidadeAulas = Math.max(
    1,
    Math.min(
      10,
      parseInt(
        chamadaForm.quantidade_aulas,
        10
      ) || 1
    )
  );

  /*
    Alunos da turma do professor.
  */

<<<<<<< HEAD
      const body = {
        nome: professorForm.nome,
        email: professorForm.email,
        telefone: professorForm.telefone,
        turma_id: professorForm.turma_id ? parseInt(professorForm.turma_id, 10) : null,
        disciplina_ids: professorForm.disciplina_ids.map(Number),
        usuario: professorForm.usuario || null,
        senha: professorForm.senha || null,
        perfil: professorForm.perfil || 'professor',
      };
=======
  const alunosDaTurma = professorLogado
    ? alunos.filter(
        (aluno) =>
          Number(aluno.turma_id) ===
          Number(
            professorLogado.turma_id
          )
      )
    : [];
>>>>>>> 5e17166b457a131b5979e10576926edb3ca24c35

  /*
    Marca ou desmarca falta.
  */

  const handleMarcarFalta = (
    alunoId,
    numeroAula
  ) => {

    const chave =
      `${alunoId}-${numeroAula}`;

    setMarcacoes((prev) => ({
      ...prev,

      [chave]:
        !prev[chave],
    }));
  };

  /*
    Confere se a falta está marcada.
  */

  const alunoTemFalta = (
    alunoId,
    numeroAula
  ) => {

    return Boolean(
      marcacoes[
        `${alunoId}-${numeroAula}`
      ]
    );
  };

  /*
    SALVAR CHAMADA
  */

  const handleSalvarChamada = async () => {

    if (!professorLogado) {

      notify(
        'Professor não identificado.',
        'error'
      );

      return;
    }

<<<<<<< HEAD
  const handleEditProfessor = (professor) => {
    setProfessorForm({
      nome: professor.nome,
      email: professor.email || '',
      telefone: professor.telefone || '',
      turma_id: professor.turma_id ? String(professor.turma_id) : '',
      disciplina_ids: (professor.disciplinas || []).map((d) => d.id),
      usuario: professor.usuario || '',
      senha: '',
      perfil: professor.perfil || 'professor',
    });
    setEditingProfessorId(professor.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
=======
    if (!authToken) {
>>>>>>> 5e17166b457a131b5979e10576926edb3ca24c35

      notify(
        'Sessão inválida. Faça login novamente.',
        'error'
      );

      return;
    }

    if (
      !chamadaForm.disciplina_id
    ) {

      notify(
        'Selecione a disciplina.',
        'error'
      );

      return;
    }

    if (!chamadaForm.data_aula) {

      notify(
        'Informe a data da aula.',
        'error'
      );

      return;
    }

    if (
      !chamadaForm.quantidade_aulas
    ) {

      notify(
        'Informe a quantidade de aulas.',
        'error'
      );

      return;
    }

    if (
      alunosDaTurma.length === 0
    ) {

      notify(
        'A turma não possui alunos cadastrados.',
        'error'
      );

      return;
    }

    /*
      Monta as faltas.
    */

    const faltas = [];

    alunosDaTurma.forEach(
      (aluno) => {

        for (
          let aula = 1;
          aula <= quantidadeAulas;
          aula++
        ) {

          const chave =
            `${aluno.id}-${aula}`;

          if (
            marcacoes[chave]
          ) {

            faltas.push({
              aluno_id: aluno.id,
              numero_aula: aula,
            });
          }
        }
      }
    );

    /*
      Dados enviados para o servidor.
    */

    const dadosChamada = {

      turma_id:
        Number(
          professorLogado.turma_id
        ),

      disciplina_id:
        Number(
          chamadaForm.disciplina_id
        ),

      data_aula:
        chamadaForm.data_aula,

      quantidade_aulas:
        quantidadeAulas,

      titulo_plano:
        chamadaForm.titulo_plano,

      faltas,
    };

    console.log(
      'DADOS DA CHAMADA:',
      dadosChamada
    );

    try {
<<<<<<< HEAD
      const url = editingNotaId
        ? `${API_BASE_URL}/api/notas/${editingNotaId}`
        : `${API_BASE_URL}/api/notas`;
      const response = await fetch(url, {
        method: editingNotaId ? 'PUT' : 'POST',
        headers: authedHeaders(),
        body: JSON.stringify({
          aluno_id: parseInt(notaForm.aluno_id),
          disciplina: parseInt(notaForm.disciplina),
          bimestre: parseInt(notaForm.bimestre),
          nota: valorNota,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || 'Erro ao salvar nota.');
      }

      notify(editingNotaId ? 'Nota atualizada com sucesso!' : 'Nota salva com sucesso!');
      setEditingNotaId(null);
      carregarNotas();

      setNotaForm(initialNotaForm);
    } catch (error) {
      console.error(error);
      notify(error.message || 'Erro ao salvar nota.', 'error');
    }
  };

  const handleEditNota = (nota) => {
    setNotaForm({
      aluno_id: String(nota.aluno_id),
      disciplina: String(nota.disciplina),
      bimestre: nota.bimestre,
      nota: String(nota.nota),
    });
    setEditingNotaId(nota.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const askDeleteNota = (id) => {
    setPendingDelete({
      title: 'Excluir nota',
      description: 'Esta ação não pode ser desfeita. Deseja realmente excluir esta nota?',
      action: async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/api/notas/${id}`, {
            method: 'DELETE',
            headers: authedHeaders(),
          });
          if (!response.ok) throw new Error('Erro ao excluir nota');
          notify('Nota excluída com sucesso!');
          carregarNotas();
        } catch (error) {
          setNotas((prev) => prev.filter((n) => n.id !== id));
          notify('Nota excluída (modo local).', 'warning');
        }
      },
    });
  };

  const handleEditFrequencia = (registro) => {
    setFrequenciaForm({
      aluno_id: String(registro.aluno_id),
      data_aula: String(registro.data_aula || registro.data || '').split('T')[0],
      presente: String(registro.presente).toLowerCase() === 'sim' || registro.presente === true || registro.presente === 1,
    });
    setEditingFrequenciaId(registro.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const askDeleteFrequencia = (id) => {
    setPendingDelete({
      title: 'Excluir frequência',
      description: 'Esta ação não pode ser desfeita. Deseja realmente excluir este registro de frequência?',
      action: async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/api/frequencias/${id}`, {
            method: 'DELETE',
            headers: authedHeaders(),
          });
          if (!response.ok) throw new Error('Erro ao excluir frequência');
          notify('Frequência excluída com sucesso!');
          carregarFrequencias();
        } catch (error) {
          setFrequencias((prev) => prev.filter((f) => f.id !== id));
          notify('Frequência excluída (modo local).', 'warning');
        }
      },
    });
  };
=======

      const response =
        await fetch(
          `${API_BASE_URL}/api/chamadas`,
          {
            method: 'POST',

            headers: {

              'Content-Type':
                'application/json',

              Authorization:
                `Bearer ${authToken}`,
            },

            body:
              JSON.stringify(
                dadosChamada
              ),
          }
        );

      const resultado =
        await response
          .json()
          .catch(() => null);

      if (!response.ok) {

        throw new Error(
          resultado?.message ||
          resultado?.error ||
          'Erro ao salvar chamada.'
        );
      }

      notify(
        'Chamada salva com sucesso!',
        'success'
      );

      /*
        Limpa todas as faltas.
      */

      setMarcacoes({});

      /*
        Mantém a data.
      */

      setChamadaForm((prev) => ({
        ...initialChamadaForm,

        data_aula:
          prev.data_aula,
      }));

    } catch (error) {

      console.error(
        'ERRO NA CHAMADA:',
        error
      );

      notify(
        error.message ||
        'Falha ao conectar com o servidor.',
        'error'
      );
    }
  };

  /* =========================================================
     RENDER LOGIN
  ========================================================= */
>>>>>>> 5e17166b457a131b5979e10576926edb3ca24c35

  if (!loggedIn) {

    return (

      <ThemeProvider theme={theme}>

        <CssBaseline />

        <Box
          sx={{
            minHeight: '100vh',

<<<<<<< HEAD
                <Box textAlign="center">
                  <Typography variant="h5" fontWeight={800}>Portal Escolar</Typography>
                  <Typography variant="body2" color="text.secondary" mt={0.5}>
                    Acesso restrito. Professor ou Administração.
                  </Typography>
                </Box>

                <form onSubmit={handleLoginSubmit} style={{ width: '100%' }}>
                  <Stack spacing={2.5}>
                    <TextField fullWidth label="E-mail" name="email" type="email" value={loginForm.email} onChange={handleLoginChange} placeholder="admin@escola.com" />
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
=======
            display: 'flex',

            alignItems: 'center',
>>>>>>> 5e17166b457a131b5979e10576926edb3ca24c35

            justifyContent: 'center',

            background:
              'linear-gradient(135deg,#0b1020,#172554)',

            p: 2,
          }}
        >

          <Paper
            elevation={10}
            sx={{
              width: 420,

              maxWidth: '100%',

              p: 5,

              borderRadius: 4,
            }}
          >

            <Stack
              spacing={3}
              alignItems="center"
            >

              <Avatar
                sx={{
                  width: 70,
                  height: 70,

                  background:
                    'linear-gradient(135deg,#4f46e5,#06b6d4)',
                }}
              >
                <SchoolIcon
                  sx={{
                    fontSize: 38,
                  }}
                />
              </Avatar>

              <Box textAlign="center">

                <Typography
                  variant="h5"
                  fontWeight={800}
                >
                  Portal Escolar
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Acesso do professor
                </Typography>

              </Box>

              {checkingSession ? (
                <Typography color="text.secondary">
                  Verificando sessão...
                </Typography>
              ) : (
              <form
                onSubmit={
                  handleLoginSubmit
                }
                style={{
                  width: '100%',
                }}
              >

                <Stack spacing={2}>

                  <TextField
                    fullWidth
                    label="E-mail"
                    name="email"
                    type="email"
                    value={
                      loginForm.email
                    }
                    onChange={
                      handleLoginChange
                    }
                  />

                  <TextField
                    fullWidth
                    label="Senha"
                    type="password"
                    name="senha"
                    value={
                      loginForm.senha
                    }
                    onChange={
                      handleLoginChange
                    }
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    sx={{
                      py: 1.5,

                      borderRadius: 3,

                      background:
                        'linear-gradient(90deg,#4f46e5,#7c3aed)',
                    }}
                  >
                    Entrar no Sistema
                  </Button>

                </Stack>

              </form>
              )}

              <Typography
                variant="caption"
                color="text.secondary"
              >
                Sistema Escolar
              </Typography>

            </Stack>

          </Paper>

        </Box>

        <Snackbar
          open={snack.open}
          autoHideDuration={4000}
          onClose={closeSnack}
        >

          <Alert
            onClose={closeSnack}
            severity={
              snack.severity
            }
            variant="filled"
          >
            {snack.message}
          </Alert>

        </Snackbar>

      </ThemeProvider>
    );
  }

  /* =========================================================
     DASHBOARD
  ========================================================= */

  const totalAlunos =
    alunos.length;

  const totalTurmas =
    turmas.length;

  const mediaGeral =
    notas.length > 0
      ? (
          notas.reduce(
            (total, item) =>
              total +
              Number(item.nota),
            0
          ) /
          notas.length
        ).toFixed(1)
      : '0.0';

<<<<<<< HEAD
  const ultimasNotas = [...notas].slice(-5).reverse();

  const podeVer = (tela) => {
    if (!professorLogado) return false;
    const perfil = professorLogado.perfil;
    if (perfil === 'admin') return tela !== 'chamada';
    return tela === 'chamada';
  };

  const irPara = (tela) => {
    if (podeVer(tela)) setView(tela);
    else setView('acesso-negado');
  };

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
          <Stack direction="row" spacing={0.5}>
            <IconButton size="small" color="primary" onClick={() => handleEditNota(item)}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" color="error" onClick={() => askDeleteNota(item.id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Box>
      </motion.div>
    );
  };
=======
  /* =========================================================
     TELA
  ========================================================= */
>>>>>>> 5e17166b457a131b5979e10576926edb3ca24c35

  return (

    <ThemeProvider theme={theme}>

      <CssBaseline />

      <Box
        sx={{
          display: 'flex',
          minHeight: '100vh',
        }}
      >

        {/* =========================
            TOPBAR
        ========================= */}

        <AppBar
          position="fixed"
          sx={{
            zIndex:
              (theme) =>
                theme.zIndex.drawer + 1,

            bgcolor: '#ffffff',

            color: 'text.primary',

            boxShadow:
              '0 1px 4px rgba(0,0,0,0.08)',
          }}
        >

          <Toolbar
            sx={{
              justifyContent:
                'space-between',
            }}
          >

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
              }}
            >

              <Avatar
                variant="rounded"
                sx={{
                  background:
                    'linear-gradient(135deg,#4f46e5,#06b6d4)',
                }}
              >
                <SchoolIcon />
              </Avatar>

              <Typography
                variant="h6"
                fontWeight={800}
              >
                Painel Escolar
              </Typography>

            </Box>
<<<<<<< HEAD
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              {professorLogado && (
                <Chip
                  label={professorLogado.nome}
                  color="primary"
                  variant="outlined"
                  sx={{ display: { xs: 'none', md: 'inline-flex' }, fontWeight: 600 }}
                />
              )}
              <Tooltip title="Conta">
                <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} size="small">
                  <Avatar sx={{ width: 38, height: 38, bgcolor: 'primary.main', fontWeight: 700 }}>
                    {getInitials(professorLogado?.nome || loginForm.email) || 'AD'}
=======

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >

              {professorLogado && (

                <Chip
                  label={
                    professorLogado.nome
                  }
                  color="primary"
                  variant="outlined"
                />

              )}

              <Tooltip title="Conta">

                <IconButton
                  onClick={(event) =>
                    setAnchorEl(
                      event.currentTarget
                    )
                  }
                >

                  <Avatar
                    sx={{
                      bgcolor:
                        'primary.main',
                    }}
                  >
                    {
                      getInitials(
                        professorLogado?.nome ||
                        professorLogado?.email
                      ) || 'P'
                    }
>>>>>>> 5e17166b457a131b5979e10576926edb3ca24c35
                  </Avatar>

                </IconButton>

              </Tooltip>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() =>
                  setAnchorEl(null)
                }
              >
<<<<<<< HEAD
                <Box px={2} py={1}>
                  <Typography variant="subtitle2" fontWeight={700}>{professorLogado?.nome || loginForm.email || 'Administrador'}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {professorLogado
                      ? professorLogado.perfil === 'admin' ? 'Administração / Gestão' : 'Professor'
                      : 'Administrador'}
                  </Typography>
                </Box>
                <Divider />
                <MenuItem
                  onClick={handleLogout}
                  sx={{ color: 'error.main', mt: 0.5 }}
=======

                <MenuItem
                  onClick={
                    handleLogout
                  }
>>>>>>> 5e17166b457a131b5979e10576926edb3ca24c35
                >

                  <ListItemIcon>
                    <LogoutIcon
                      fontSize="small"
                    />
                  </ListItemIcon>

                  Sair

                </MenuItem>

              </Menu>

            </Box>

          </Toolbar>

        </AppBar>

        {/* =========================
            SIDEBAR
        ========================= */}

        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,

            flexShrink: 0,

            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',

              background:
                'linear-gradient(180deg,#0b1020,#111936)',

              color: '#ffffff',
            },
          }}
        >
<<<<<<< HEAD
          <Toolbar />
          <Box sx={{ overflow: 'auto', mt: 2, px: 1.5 }}>
            <List sx={{ position: 'relative' }}>
              {menuItems.map((item) => {
                const ehAdmin = professorLogado?.perfil === 'admin';
                const permitido = professorLogado
                  ? ehAdmin
                    ? item.key !== 'chamada'
                    : item.key === 'chamada'
                  : true;
                if (!permitido) return null;
                const isSelected = view === item.key;
                return (
                  <ListItem key={item.key} disablePadding sx={{ mb: 0.5 }}>
                    <ListItemButton
                      onClick={() => irPara(item.key)}
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
=======
>>>>>>> 5e17166b457a131b5979e10576926edb3ca24c35

          <Toolbar />

          <Box
            sx={{
              p: 1.5,
              mt: 2,
            }}
          >

            <List>

              {menuItems.map(
                (item) => {

                  /*
                    Professor só pode
                    acessar chamada.
                  */

                  const permitido =
                    professorLogado
                      ? item.key ===
                        'chamada'
                      : true;

                  if (!permitido)
                    return null;

                  return (

                    <ListItem
                      key={
                        item.key
                      }
                      disablePadding
                      sx={{
                        mb: 0.5,
                      }}
                    >
<<<<<<< HEAD
                      <Box sx={{ position: 'absolute', right: -60, top: -80, width: 280, height: 280, borderRadius: '50%', background: 'rgba(255,255,255,0.09)' }} />
                      <Box sx={{ position: 'absolute', right: 90, bottom: -110, width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
                      <Box position="relative">
                        <Chip label={professorLogado?.perfil === 'admin' ? 'Painel de gestão' : 'Chamada do professor'} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.16)', color: '#fff', fontWeight: 600, mb: 1.5 }} />
                        <Typography variant="h4" gutterBottom>
                          Bem-vindo, {professorLogado?.nome || loginForm.usuario || 'Administrador'} 👋
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.85)', maxWidth: 560 }}>
                          {professorLogado?.perfil === 'admin'
                            ? 'Acompanhe o resumo da escola abaixo ou utilize o menu lateral para gerenciar alunos, turmas, disciplinas, notas e professores.'
                            : 'Utilize a tela de chamada para registrar a frequência da sua disciplina.'}
                        </Typography>
                      </Box>
                    </Paper>
=======
>>>>>>> 5e17166b457a131b5979e10576926edb3ca24c35

                      <ListItemButton
                        selected={
                          view ===
                          item.key
                        }
                        onClick={() =>
                          setView(
                            item.key
                          )
                        }
                        sx={{
                          borderRadius: 2,

                          '&.Mui-selected':
                            {
                              bgcolor:
                                '#4f46e5',

                              color:
                                '#ffffff',

                              '&:hover':
                                {
                                  bgcolor:
                                    '#4338ca',
                                },
                            },
                        }}
                      >

                        <ListItemIcon
                          sx={{
                            color:
                              view ===
                              item.key
                                ? '#fff'
                                : '#aab1c9',
                          }}
                        >
                          {
                            item.icon
                          }
                        </ListItemIcon>

                        <ListItemText
                          primary={
                            item.label
                          }
                        />

                      </ListItemButton>

                    </ListItem>

                  );
                }
              )}

            </List>

          </Box>

        </Drawer>

        {/* =========================
            CONTEÚDO
        ========================= */}

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
          }}
        >

          <Toolbar />

          <Container
            maxWidth="xl"
          >

            {/* =====================================
                CHAMADA
            ===================================== */}

            {view === 'chamada' && (

              <Box>

                <Typography
                  variant="h4"
                  gutterBottom
                >
                  Fazer Chamada
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{
                    mb: 3,
                  }}
                >
                  Registre a frequência
                  dos alunos da sua turma.
                </Typography>

                {/* =========================
                    PROFESSOR
                ========================= */}

                <Card
                  sx={{
                    mb: 3,
                  }}
                >

                  <CardContent>

                    <Typography
                      variant="h6"
                      sx={{
                        mb: 2,
                      }}
                    >
                      Professor
                    </Typography>

                    <TextField
                      fullWidth
                      disabled
                      label="Professor logado"
                      value={
                        professorLogado?.nome ||
                        ''
                      }
                    />

                  </CardContent>

                </Card>

                {/* =========================
                    DADOS DA AULA
                ========================= */}

                <Card
                  sx={{
                    mb: 3,
                  }}
                >

                  <CardContent>

                    <Typography
                      variant="h6"
                      sx={{
                        mb: 2,
                      }}
                    >
                      Dados da Aula
                    </Typography>

                    <Grid
                      container
                      spacing={2}
                    >

                      {/* TURMA */}

                      <Grid
                        item
                        xs={12}
                        md={3}
                      >

                        <TextField
                          fullWidth
                          label="Turma"
                          value={
                            turmas.find(
                              (turma) =>
                                Number(
                                  turma.id
                                ) ===
                                Number(
                                  professorLogado?.turma_id
                                )
                            )?.nome || ''
                          }
                          disabled
                        />

<<<<<<< HEAD
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={7}>
                        <SectionCard title="Acesso rápido">
                          <Grid container spacing={1.5}>
                            {menuItems.slice(1, 6).map((item) => (
                              <Grid item xs={12} sm={6} key={item.key}>
                                <Button
                                  fullWidth
                                  variant="outlined"
                                  onClick={() => irPara(item.key)}
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
=======
>>>>>>> 5e17166b457a131b5979e10576926edb3ca24c35
                      </Grid>

                      {/* DISCIPLINA */}

                      <Grid
                        item
                        xs={12}
                        md={3}
                      >

                        <TextField
                          select
                          fullWidth
                          label="Disciplina"
                          name="disciplina_id"
                          value={
                            chamadaForm.disciplina_id
                          }
                          onChange={
                            handleChamadaChange
                          }
                        >

                          {disciplinas.map(
                            (disciplina) => (

                              <MenuItem
                                key={
                                  disciplina.id
                                }
                                value={
                                  disciplina.id
                                }
                              >
                                {
                                  disciplina.nome
                                }
                              </MenuItem>

                            )
                          )}

                        </TextField>

<<<<<<< HEAD
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

                    <SectionCard title={editingNotaId ? 'Editar nota' : 'Nova nota'}>
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
                            {editingNotaId ? 'Salvar Alterações' : 'Salvar Nota'}
                          </Button>
                          <Button
                            variant="text"
                            color="inherit"
                            startIcon={<CloseIcon />}
                            sx={{ px: 3, borderRadius: 3 }}
                            onClick={() => {
                              setEditingNotaId(null);
                              setNotaForm(initialNotaForm);
                            }}
                          >
                            {editingNotaId ? 'Cancelar edição' : 'Limpar'}
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
=======
>>>>>>> 5e17166b457a131b5979e10576926edb3ca24c35
                      </Grid>

                      {/* DATA */}

                      <Grid
                        item
                        xs={12}
                        md={2}
                      >

<<<<<<< HEAD
                {/* CHAMADA / FREQUÊNCIA */}
                {view === 'frequencia' && (
                  <Box>
                    <Typography variant="h5" sx={{ mb: 2.5 }}>
                      Registro de Frequência
                    </Typography>

                    <SectionCard title={editingFrequenciaId ? 'Editar frequência' : 'Registrar chamada'}>
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
                            {editingFrequenciaId ? 'Salvar alterações' : 'Registrar'}
                          </Button>
                          <Button
                            type="button"
                            variant="text"
                            color="inherit"
                            startIcon={<CloseIcon />}
                            sx={{ px: 3, borderRadius: 3 }}
                            onClick={() => {
                              setEditingFrequenciaId(null);
                              setFrequenciaForm(initialFrequenciaForm);
                            }}
                          >
                            {editingFrequenciaId ? 'Cancelar edição' : 'Limpar'}
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
                                <TableCell align="right" sx={{ fontWeight: 700 }}>Ações</TableCell>
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
                                    <TableCell align="right">
                                      <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                                        <IconButton size="small" color="primary" onClick={() => handleEditFrequencia(registro)}>
                                          <EditIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton size="small" color="error" onClick={() => askDeleteFrequencia(registro.id)}>
                                          <DeleteIcon fontSize="small" />
                                        </IconButton>
                                      </Stack>
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

                {/* AUDITORIA */}
                {view === 'auditoria' && (
                  <Box>
                    <Typography variant="h5" sx={{ mb: 2.5 }}>
                      Auditoria Digital
                    </Typography>

                    {auditoriaIndicadores && (
                      <Grid container spacing={2.5} sx={{ mb: 3 }}>
                        <Grid item xs={12} sm={6} md={3}>
                          <SectionCard title="Eventos no total">
                            <Typography variant="h4" fontWeight={800} color="primary.main">{auditoriaIndicadores.total_eventos}</Typography>
                          </SectionCard>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <SectionCard title="Logins recusados (24h)">
                            <Typography variant="h4" fontWeight={800} color={auditoriaIndicadores.logins_recusados_24h > 0 ? 'error.main' : 'success.main'}>
                              {auditoriaIndicadores.logins_recusados_24h}
                            </Typography>
                          </SectionCard>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <SectionCard title="Último acesso">
                            <Typography variant="body2" fontWeight={700}>
                              {auditoriaIndicadores.ultimos_acessos?.length
                                ? auditoriaIndicadores.ultimos_acessos[0].usuario_nome
                                : '—'}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {auditoriaIndicadores.ultimos_acessos?.length
                                ? formatarDataHora(auditoriaIndicadores.ultimos_acessos[0].ultimo_acesso)
                                : 'sem registros'}
                            </Typography>
                          </SectionCard>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <SectionCard title="Possíveis ataques">
                            <Typography variant="h4" fontWeight={800} color={(auditoriaIndicadores.alerta_tentativas?.length || 0) > 0 ? 'error.main' : 'success.main'}>
                              {(auditoriaIndicadores.alerta_tentativas || []).length}
                            </Typography>
                            {auditoriaIndicadores.alerta_tentativas?.length > 0 && (
                              <Typography variant="caption" color="text.secondary">
                                {auditoriaIndicadores.alerta_tentativas.map((a) => `${a.usuario_nome} (${a.tentativas}x)`).join(', ')}
                              </Typography>
                            )}
                          </SectionCard>
                        </Grid>
                      </Grid>
                    )}

                    <SectionCard title="Filtros">
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4}>
                          <TextField
                            fullWidth
                            label="Buscar por usuário"
                            value={auditoriaFiltros.busca}
                            onChange={(e) => setAuditoriaFiltros((prev) => ({ ...prev, busca: e.target.value }))}
                            placeholder="admin@escola.com"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                          <TextField
                            select
                            fullWidth
                            label="Operação"
                            value={auditoriaFiltros.operacao}
                            onChange={(e) => setAuditoriaFiltros((prev) => ({ ...prev, operacao: e.target.value }))}
                          >
                            <MenuItem value="">Todas</MenuItem>
                            <MenuItem value="LOGIN_SUCESSO">Login com sucesso</MenuItem>
                            <MenuItem value="LOGIN_FALHA">Login recusado</MenuItem>
                            <MenuItem value="CRIAR">Criar</MenuItem>
                            <MenuItem value="EDITAR">Editar</MenuItem>
                            <MenuItem value="EXCLUIR">Excluir</MenuItem>
                          </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                          <TextField
                            fullWidth
                            label="De"
                            type="date"
                            value={auditoriaFiltros.inicio}
                            onChange={(e) => setAuditoriaFiltros((prev) => ({ ...prev, inicio: e.target.value }))}
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                          <TextField
                            fullWidth
                            label="Até"
                            type="date"
                            value={auditoriaFiltros.fim}
                            onChange={(e) => setAuditoriaFiltros((prev) => ({ ...prev, fim: e.target.value }))}
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                      </Grid>
                    </SectionCard>

                    <Box sx={{ mt: 3 }}>
                      <SectionCard title={`Registros de auditoria (${auditoria.length})`}>
                        {auditoria.length === 0 ? (
                          <EmptyState icon={<HistoryIcon />} text="Nenhum registro encontrado com os filtros aplicados." />
                        ) : (
                          <TableContainer sx={{ borderRadius: 3, border: '1px solid', borderColor: 'grey.200' }}>
                            <Table size="small">
                              <TableHead sx={{ bgcolor: 'grey.50' }}>
                                <TableRow>
                                  <TableCell sx={{ fontWeight: 700 }}>Data / Hora</TableCell>
                                  <TableCell sx={{ fontWeight: 700 }}>Usuário</TableCell>
                                  <TableCell sx={{ fontWeight: 700 }}>Perfil</TableCell>
                                  <TableCell sx={{ fontWeight: 700 }}>Operação</TableCell>
                                  <TableCell sx={{ fontWeight: 700 }}>Recurso</TableCell>
                                  <TableCell sx={{ fontWeight: 700 }}>Detalhes</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {auditoria.map((registro) => (
                                  <TableRow key={registro.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell>{formatarDataHora(registro.criado_em)}</TableCell>
                                    <TableCell>
                                      <Typography fontWeight={600}>{registro.usuario_nome}</Typography>
                                      <Typography variant="caption" color="text.secondary">ID {registro.usuario_id}</Typography>
                                    </TableCell>
                                    <TableCell>
                                      <Chip
                                        label={String(registro.perfil).toUpperCase()}
                                        size="small"
                                        color={registro.perfil === 'admin' ? 'warning' : 'primary'}
                                        variant="outlined"
                                        sx={{ fontWeight: 700 }}
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <Chip
                                        label={registro.operacao}
                                        size="small"
                                        color={operacaoColor(registro.operacao)}
                                        sx={{ fontWeight: 700 }}
                                      />
                                    </TableCell>
                                    <TableCell>{registro.recurso}{registro.recurso_id ? ` #${registro.recurso_id}` : ''}</TableCell>
                                    <TableCell sx={{ maxWidth: 320 }}>
                                      <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{
                                          overflow: 'hidden',
                                          textOverflow: 'ellipsis',
                                          display: '-webkit-box',
                                          WebkitLineClamp: 2,
                                          WebkitBoxOrient: 'vertical',
                                        }}
                                      >
                                        {formatarDetalhes(humanizarDetalhes(registro.detalhes))}
                                      </Typography>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        )}
                      </SectionCard>
                    </Box>
                  </Box>
                )}

                {/* ACESSO NEGADO */}
                {view === 'acesso-negado' && (
                  <Box sx={{ textAlign: 'center', py: 8 }}>
                    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                      <Avatar sx={{ width: 88, height: 88, bgcolor: 'error.main', mx: 'auto', mb: 3 }}>
                        <LockIcon sx={{ fontSize: 44 }} />
                      </Avatar>
                    </motion.div>
                    <Typography variant="h4" fontWeight={800} sx={{ mb: 1 }}>
                      Acesso Negado
                    </Typography>
                    <Typography color="text.secondary" sx={{ mb: 4, maxWidth: 420, mx: 'auto' }}>
                      Sua conta não tem permissão para acessar esta área. Entre em contato com a coordenação caso acredite que isso é um erro.
                    </Typography>
                    <Button variant="contained" startIcon={<DashboardIcon />} onClick={() => irPara('dashboard')} sx={{ px: 4, py: 1.2, borderRadius: 3 }}>
                      Voltar ao início
                    </Button>
                  </Box>
                )}

                {/* CHAMADA DO PROFESSOR */}
                {view === 'chamada' && (
                  <Box>
                    <Typography variant="h5" sx={{ mb: 0.5 }}>Fazer Chamada</Typography>
                    <Typography color="text.secondary" sx={{ mb: 3 }}>
                      Registre a frequencia dos alunos da sua turma.
                    </Typography>

                    <SectionCard title="Professor">
                      <TextField
                        fullWidth
                        disabled
                        label="Professor logado"
                        value={professorLogado?.nome || ''}
                      />
                    </SectionCard>

                    <SectionCard title="Dados da Aula">
                      <Grid container spacing={2.5}>
                        <Grid item xs={12} md={3}>
                          <TextField
                            fullWidth
                            label="Turma"
                            value={turmas.find((t) => Number(t.id) === Number(professorLogado?.turma_id))?.nome || ''}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <TextField
                            select
                            fullWidth
                            label="Disciplina"
                            name="disciplina_id"
                            value={chamadaForm.disciplina_id}
                            onChange={handleChamadaChange}
                          >
                            {(professorLogado?.disciplinas || []).length > 0
                              ? professorLogado.disciplinas.map((d) => (
                                  <MenuItem key={d.id} value={d.id}>{d.nome}</MenuItem>
                                ))
                              : disciplinas.map((disciplina) => (
                                  <MenuItem key={disciplina.id} value={disciplina.id}>{disciplina.nome}</MenuItem>
                                ))
                            }
                          </TextField>
                        </Grid>
                        <Grid item xs={12} md={2}>
                          <TextField
                            fullWidth
                            type="date"
                            label="Data da aula"
                            name="data_aula"
                            value={chamadaForm.data_aula}
                            onChange={handleChamadaChange}
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        <Grid item xs={12} md={2}>
                          <TextField
                            fullWidth
                            type="number"
                            label="Quantidade de aulas"
                            name="quantidade_aulas"
                            value={chamadaForm.quantidade_aulas}
                            onChange={handleChamadaChange}
                            inputProps={{ min: 1, max: 10 }}
                          />
                        </Grid>
                        <Grid item xs={12} md={2}>
                          <TextField
                            fullWidth
                            label="Titulo do plano"
                            name="titulo_plano"
                            value={chamadaForm.titulo_plano}
                            onChange={handleChamadaChange}
                          />
                        </Grid>
                      </Grid>
                    </SectionCard>

                    <SectionCard title="Resumo">
                      <Stack direction="row" spacing={2} flexWrap="wrap">
                        <Chip label={`Professor: ${professorLogado?.nome || '---'}`} />
                        <Chip label={`Alunos: ${alunosDaTurma.length}`} />
                        <Chip label={`Aulas: ${quantidadeAulas}`} color="primary" />
                      </Stack>
                    </SectionCard>

                    <SectionCard title="Alunos da Turma">
                      {alunosDaTurma.length === 0 ? (
                        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
                          <Typography color="text.secondary">
                            Nenhum aluno encontrado nesta turma.
                          </Typography>
                        </Paper>
                      ) : (
                        <TableContainer sx={{ borderRadius: 3, border: '1px solid', borderColor: 'grey.200' }}>
                          <Table size="small">
                            <TableHead sx={{ bgcolor: 'grey.50' }}>
                              <TableRow>
                                <TableCell sx={{ fontWeight: 700 }}>Aluno</TableCell>
                                {Array.from({ length: quantidadeAulas }, (_, index) => (
                                  <TableCell key={index} align="center" sx={{ fontWeight: 700 }}>
                                    Aula {index + 1}
                                  </TableCell>
                                ))}
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {alunosDaTurma.map((aluno) => (
                                <TableRow key={aluno.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                  <TableCell>
                                    <Stack direction="row" spacing={1.5} alignItems="center">
                                      <Avatar sx={{ width: 34, height: 34, bgcolor: 'primary.50', color: 'primary.main', fontSize: 13, fontWeight: 700 }}>
                                        {getInitials(aluno.nome)}
                                      </Avatar>
                                      <Typography fontWeight={600}>{aluno.nome}</Typography>
                                    </Stack>
                                  </TableCell>
                                  {Array.from({ length: quantidadeAulas }, (_, index) => {
                                    const numeroAula = index + 1;
                                    const chave = `${aluno.id}-${numeroAula}`;
                                    return (
                                      <TableCell key={chave} align="center">
                                        <Stack alignItems="center" spacing={0}>
                                          <Checkbox
                                            checked={alunoTemFalta(aluno.id, numeroAula)}
                                            onChange={() => handleMarcarFalta(aluno.id, numeroAula)}
                                            color="error"
                                          />
                                          <Typography variant="caption" color="text.secondary">
                                            Falta
                                          </Typography>
                                        </Stack>
                                      </TableCell>
                                    );
                                  })}
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      )}
                    </SectionCard>

                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        onClick={handleSalvarChamada}
                        sx={{ px: 4, py: 1.5, borderRadius: 3 }}
                      >
                        Salvar Chamada
                      </Button>
                    </Box>
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
                          <Grid item xs={12} md={6}>
                            <TextField fullWidth label="Usuário (login)" name="usuario" value={professorForm.usuario} onChange={handleProfessorChange} placeholder="Ex.: maria" />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField fullWidth label="Senha" name="senha" type="password" value={professorForm.senha} onChange={handleProfessorChange} placeholder={editingProfessorId ? 'Deixe em branco para manter' : 'Senha do login'} />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              select
                              fullWidth
                              label="Perfil de acesso"
                              name="perfil"
                              value={professorForm.perfil || 'professor'}
                              onChange={handleProfessorChange}
                            >
                              <MenuItem value="professor">Professor (acesso só à chamada)</MenuItem>
                              <MenuItem value="admin">Administrador / Gestão (acesso total)</MenuItem>
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
=======
                        <TextField
                          fullWidth
                          type="date"
                          label="Data da aula"
                          name="data_aula"
                          value={
                            chamadaForm.data_aula
                          }
                          onChange={
                            handleChamadaChange
                          }
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />

                      </Grid>

                      {/* QUANTIDADE */}

                      <Grid
                        item
                        xs={12}
                        md={2}
                      >

                        <TextField
                          fullWidth
                          type="number"
                          label="Quantidade de aulas"
                          name="quantidade_aulas"
                          value={
                            chamadaForm.quantidade_aulas
                          }
                          onChange={
                            handleChamadaChange
                          }
                          inputProps={{
                            min: 1,
                            max: 10,
                          }}
                        />

                      </Grid>

                      {/* PLANO */}

                      <Grid
                        item
                        xs={12}
                        md={2}
                      >

                        <TextField
                          fullWidth
                          label="Título do plano"
                          name="titulo_plano"
                          value={
                            chamadaForm.titulo_plano
                          }
                          onChange={
                            handleChamadaChange
                          }
                        />

                      </Grid>

                    </Grid>

                  </CardContent>

                </Card>

                {/* =========================
                    RESUMO
                ========================= */}

                <Card
                  sx={{
                    mb: 3,
                  }}
                >

                  <CardContent>

                    <Stack
                      direction="row"
                      spacing={2}
                      flexWrap="wrap"
                    >

                      <Chip
                        label={`Professor: ${
                          professorLogado?.nome ||
                          '—'
                        }`}
                      />

                      <Chip
                        label={`Alunos: ${
                          alunosDaTurma.length
                        }`}
                      />

                      <Chip
                        label={`Aulas: ${
                          quantidadeAulas
                        }`}
                        color="primary"
                      />

                    </Stack>

                  </CardContent>
>>>>>>> 5e17166b457a131b5979e10576926edb3ca24c35

                </Card>

                {/* =========================
                    LISTA DE ALUNOS
                ========================= */}

                <Card>

                  <CardContent>

                    <Typography
                      variant="h6"
                      sx={{
                        mb: 2,
                      }}
                    >
<<<<<<< HEAD
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
                                <TableCell sx={{ fontWeight: 700 }}>Perfil</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Disciplinas</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 700 }}>Ações</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {professoresFiltrados.map((professor) => (
                                <TableRow key={professor.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
=======
                      Alunos da Turma
                    </Typography>

                    {alunosDaTurma.length ===
                    0 ? (

                      <Paper
                        variant="outlined"
                        sx={{
                          p: 4,
                          textAlign:
                            'center',
                        }}
                      >

                        <Typography
                          color="text.secondary"
                        >
                          Nenhum aluno
                          encontrado
                          nesta turma.
                        </Typography>

                      </Paper>

                    ) : (

                      <TableContainer>

                        <Table>

                          <TableHead>

                            <TableRow>

                              <TableCell>
                                Aluno
                              </TableCell>

                              {Array.from(
                                {
                                  length:
                                    quantidadeAulas,
                                },
                                (_, index) => (

                                  <TableCell
                                    key={
                                      index
                                    }
                                    align="center"
                                  >
                                    Aula{' '}
                                    {index + 1}
                                  </TableCell>

                                )
                              )}

                            </TableRow>

                          </TableHead>

                          <TableBody>

                            {alunosDaTurma.map(
                              (aluno) => (

                                <TableRow
                                  key={
                                    aluno.id
                                  }
                                >

>>>>>>> 5e17166b457a131b5979e10576926edb3ca24c35
                                  <TableCell>

                                    <Stack
                                      direction="row"
                                      alignItems="center"
                                      spacing={2}
                                    >

                                      <Avatar>
                                        {
                                          getInitials(
                                            aluno.nome
                                          )
                                        }
                                      </Avatar>

                                      <Typography
                                        fontWeight={
                                          600
                                        }
                                      >
                                        {
                                          aluno.nome
                                        }
                                      </Typography>

                                    </Stack>

                                  </TableCell>
<<<<<<< HEAD
                                  <TableCell>
                                    <Typography variant="body2">{professor.email || '—'}</Typography>
                                    <Typography variant="caption" color="text.secondary">{professor.telefone || ''}</Typography>
                                  </TableCell>
                                  <TableCell>
                                    <Chip label={turmas.find((t) => t.id === professor.turma_id)?.nome || professor.turma?.nome || '—'} size="small" variant="outlined" sx={{ borderColor: 'grey.300' }} />
                                  </TableCell>
                                  <TableCell>
                                    <Chip
                                      label={professor.perfil === 'admin' ? 'Administrador' : 'Professor'}
                                      size="small"
                                      sx={{
                                        bgcolor: professor.perfil === 'admin' ? 'rgba(124,58,237,0.12)' : 'rgba(79,70,229,0.08)',
                                        color: professor.perfil === 'admin' ? '#6d28d9' : 'primary.main',
                                        fontWeight: 600,
                                      }}
                                    />
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
=======

                                  {/* CHECKBOX
                                      POR AULA */}

                                  {Array.from(
                                    {
                                      length:
                                        quantidadeAulas,
                                    },
                                    (_, index) => {

                                      const numeroAula =
                                        index + 1;

                                      const chave =
                                        `${aluno.id}-${numeroAula}`;

                                      return (

                                        <TableCell
                                          key={
                                            chave
                                          }
                                          align="center"
                                        >

                                          <Stack
                                            alignItems="center"
                                            spacing={0}
                                          >

                                            <Checkbox
                                              checked={alunoTemFalta(
                                                aluno.id,
                                                numeroAula
                                              )}
                                              onChange={() =>
                                                handleMarcarFalta(
                                                  aluno.id,
                                                  numeroAula
                                                )
                                              }
                                              color="error"
                                            />

                                            <Typography
                                              variant="caption"
                                              color="text.secondary"
                                            >
                                              Falta
                                            </Typography>

                                          </Stack>

                                        </TableCell>

                                      );
                                    }
                                  )}

>>>>>>> 5e17166b457a131b5979e10576926edb3ca24c35
                                </TableRow>

                              )
                            )}

                          </TableBody>

                        </Table>

                      </TableContainer>

                    )}

                  </CardContent>

                </Card>

                {/* =========================
                    BOTÃO SALVAR
                ========================= */}

                <Box
                  sx={{
                    mt: 3,

                    display: 'flex',

                    justifyContent:
                      'flex-end',
                  }}
                >

                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    onClick={
                      handleSalvarChamada
                    }
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderRadius: 3,
                    }}
                  >
                    Salvar Chamada
                  </Button>

                </Box>

              </Box>

            )}

            {/* =====================================
                DASHBOARD
            ===================================== */}

            {view === 'dashboard' && (

              <Box>

                <Typography
                  variant="h4"
                  gutterBottom
                >
                  Dashboard
                </Typography>

                <Grid
                  container
                  spacing={3}
                >

                  <Grid
                    item
                    xs={12}
                    md={4}
                  >

                    <Card>

                      <CardContent>

                        <Typography
                          color="text.secondary"
                        >
                          Total de Alunos
                        </Typography>

                        <Typography
                          variant="h3"
                        >
                          {
                            totalAlunos
                          }
                        </Typography>

                      </CardContent>

                    </Card>

                  </Grid>

                  <Grid
                    item
                    xs={12}
                    md={4}
                  >

                    <Card>

                      <CardContent>

                        <Typography
                          color="text.secondary"
                        >
                          Total de Turmas
                        </Typography>

                        <Typography
                          variant="h3"
                        >
                          {
                            totalTurmas
                          }
                        </Typography>

                      </CardContent>

                    </Card>

                  </Grid>

                  <Grid
                    item
                    xs={12}
                    md={4}
                  >

                    <Card>

                      <CardContent>

                        <Typography
                          color="text.secondary"
                        >
                          Média Geral
                        </Typography>

                        <Typography
                          variant="h3"
                        >
                          {
                            mediaGeral
                          }
                        </Typography>

                      </CardContent>

                    </Card>

                  </Grid>

                </Grid>

              </Box>

            )}

          </Container>

        </Box>

      </Box>

      {/* =========================
          NOTIFICAÇÃO
      ========================= */}

      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={closeSnack}
      >

        <Alert
          onClose={closeSnack}
          severity={
            snack.severity
          }
          variant="filled"
          sx={{
            width: '100%',
          }}
        >
          {
            snack.message
          }
        </Alert>

      </Snackbar>

    </ThemeProvider>
  );
}

export default App;
