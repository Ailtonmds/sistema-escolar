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
  const [checkingSession, setCheckingSession] = useState(true);

  const [loginForm, setLoginForm] = useState({
    email: '',
    senha: '',
  });

  const [anchorEl, setAnchorEl] = useState(null);

  /* =========================
     NOTIFICAÇÕES
  ========================= */

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

  const closeSnack = () => {
    setSnack((prev) => ({
      ...prev,
      open: false,
    }));
  };

  /* =========================
     CARREGAR DADOS
  ========================= */

  const carregarAlunos = async () => {

    try {

      const response = await fetch(
        `${API_BASE_URL}/api/alunos`
      );

      if (!response.ok) {
        throw new Error('Erro ao carregar alunos');
      }

      const data = await response.json();

      setAlunos(data);

    } catch (error) {

      console.error(error);

    }
  };

  const carregarTurmas = async () => {

    try {

      const response = await fetch(
        `${API_BASE_URL}/api/turmas`
      );

      if (!response.ok) {
        throw new Error('Erro ao carregar turmas');
      }

      const data = await response.json();

      setTurmas(data);

    } catch (error) {

      console.error(error);

    }
  };

  const carregarNotas = async () => {

    try {

      const response = await fetch(
        `${API_BASE_URL}/api/notas`
      );

      if (!response.ok) {
        throw new Error('Erro ao carregar notas');
      }

      const data = await response.json();

      setNotas(data);

    } catch (error) {

      console.error(error);

    }
  };

  const carregarFrequencias = async () => {

    try {

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

    } catch (error) {

      console.error(error);

    }
  };

  const carregarDisciplinas = async () => {

    try {

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

    } catch (error) {

      console.error(error);

    }
  };

  const carregarProfessores = async () => {

    try {

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

    } catch (error) {

      console.error(error);

    }
  };

  useEffect(() => {

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

      if (!response.ok) {

        notify(
          data?.message ||
          'Usuário ou senha inválidos.',
          'error'
        );

        return;
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

      console.error(error);

      notify(
        'Falha ao conectar com o servidor.',
        'error'
      );
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

  const alunosDaTurma = professorLogado
    ? alunos.filter(
        (aluno) =>
          Number(aluno.turma_id) ===
          Number(
            professorLogado.turma_id
          )
      )
    : [];

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

    if (!authToken) {

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

  if (!loggedIn) {

    return (

      <ThemeProvider theme={theme}>

        <CssBaseline />

        <Box
          sx={{
            minHeight: '100vh',

            display: 'flex',

            alignItems: 'center',

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

  /* =========================================================
     TELA
  ========================================================= */

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

                <MenuItem
                  onClick={
                    handleLogout
                  }
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

                      </Grid>

                      {/* DATA */}

                      <Grid
                        item
                        xs={12}
                        md={2}
                      >

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
