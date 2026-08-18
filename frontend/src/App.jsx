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
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';

// Ícones MUI
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

// ==========================================
// CONFIGURAÇÃO DA API BACKEND
// ==========================================
const API_BASE_URL = 'http://localhost:3000';
const drawerWidth = 260;

// ==========================================
// ESTADOS INICIAIS
// ==========================================
const initialForm = {
  nome: '',
  email: '',
  data_nascimento: '',
  serie: '',
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
  bimestre: '1º Bimestre',
  nota: '',
};

// ==========================================
// MENU DO SISTEMA
// ==========================================
const menuItems = [
  { key: 'dashboard', label: 'Início', description: 'Visão geral do sistema', icon: <DashboardIcon /> },
  { key: 'alunos', label: 'Alunos', description: 'Cadastro e consulta de estudantes', icon: <PeopleIcon /> },
  { key: 'professores', label: 'Professores', description: 'Gestão da equipe', icon: <SupervisorAccountIcon /> },
  { key: 'turmas', label: 'Turmas', description: 'Organização escolar', icon: <ClassIcon /> },
  { key: 'notas', label: 'Notas / Boletim', description: 'Lançamento e consulta de notas', icon: <AssessmentIcon /> },
  { key: 'financeiro', label: 'Financeiro', description: 'Mensalidades e contas', icon: <AttachMoneyIcon /> },
  { key: 'relatorios', label: 'Relatórios', description: 'Indicadores da escola', icon: <BarChartIcon /> },
];

function App() {
  // ESTADOS DOS ALUNOS
  const [form, setForm] = useState(initialForm);
  const [alunos, setAlunos] = useState([]);
  const [message, setMessage] = useState('');
  const [editingAlunoId, setEditingAlunoId] = useState(null);
  const [searchAluno, setSearchAluno] = useState('');

  // ESTADOS DAS TURMAS
  const [turmaForm, setTurmaForm] = useState(initialTurmaForm);
  const [turmas, setTurmas] = useState([]);
  const [turmaMessage, setTurmaMessage] = useState('');
  const [editingTurmaId, setEditingTurmaId] = useState(null);
  const [searchTurma, setSearchTurma] = useState('');

  // ESTADOS DAS NOTAS
  const [notaForm, setNotaForm] = useState(initialNotaForm);
  const [notas, setNotas] = useState([]);
  const [notaMessage, setNotaMessage] = useState('');
  const [filtroAlunoId, setFiltroAlunoId] = useState('');

  // ESTADOS DO SISTEMA
  const [view, setView] = useState('dashboard');
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ usuario: '', senha: '' });

  // CARREGAR DADOS
  const carregarAlunos = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/alunos`);
      if (!response.ok) throw new Error('Erro ao carregar alunos');
      const data = await response.json();
      setAlunos(data);
    } catch (error) {
      console.error(error);
    }
  };

  const carregarTurmas = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/turmas`);
      if (!response.ok) throw new Error('Erro ao carregar turmas');
      const data = await response.json();
      setTurmas(data);
    } catch (error) {
      console.error(error);
      setTurmaMessage(error.message);
    }
  };

  const carregarNotas = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/notas`);
      if (!response.ok) throw new Error('Erro ao carregar notas');
      const data = await response.json();
      setNotas(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    carregarAlunos();
    carregarTurmas();
    carregarNotas();
  }, []);

  // HANDLERS
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleTurmaChange = (e) => setTurmaForm({ ...turmaForm, [e.target.name]: e.target.value });
  const handleNotaChange = (e) => setNotaForm({ ...notaForm, [e.target.name]: e.target.value });
  const handleLoginChange = (e) => setLoginForm({ ...loginForm, [e.target.name]: e.target.value });

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    if (loginForm.usuario && loginForm.senha) {
      setLoggedIn(true);
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
        const errorText = await response.text();
        throw new Error(errorText || 'Erro ao salvar aluno');
      }

      setMessage(editingAlunoId ? 'Aluno atualizado com sucesso!' : 'Aluno cadastrado com sucesso!');
      setForm(initialForm);
      setEditingAlunoId(null);
      carregarAlunos();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleEditAluno = (aluno) => {
    setForm(aluno);
    setEditingAlunoId(aluno.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteAluno = async (id) => {
    if (!window.confirm('Deseja realmente excluir este aluno?')) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/alunos/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Erro ao excluir aluno');
      setMessage('Aluno excluído com sucesso!');
      carregarAlunos();
    } catch (error) {
      setAlunos((prev) => prev.filter((a) => a.id !== id));
      setMessage('Aluno excluído com sucesso! (Modo Local)');
    }
  };

  const alunosFiltrados = alunos.filter((aluno) =>
    Object.values(aluno).some((val) =>
      String(val).toLowerCase().includes(searchAluno.toLowerCase())
    )
  );

  // CRUD TURMAS
  const handleTurmaSubmit = async (event) => {
    event.preventDefault();
    try {
      const method = editingTurmaId ? 'PUT' : 'POST';
      const url = editingTurmaId ? `${API_BASE_URL}/api/turmas/${editingTurmaId}` : `${API_BASE_URL}/api/turmas`;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(turmaForm),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Erro ao salvar turma');
      }

      setTurmaMessage(editingTurmaId ? 'Turma atualizada com sucesso!' : 'Turma cadastrada com sucesso!');
      setTurmaForm(initialTurmaForm);
      setEditingTurmaId(null);
      carregarTurmas();
    } catch (error) {
      setTurmaMessage(error.message);
    }
  };

  const handleEditTurma = (turma) => {
    setTurmaForm(turma);
    setEditingTurmaId(turma.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteTurma = async (id) => {
    if (!window.confirm('Deseja realmente excluir esta turma?')) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/turmas/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Erro ao excluir turma');
      setTurmaMessage('Turma excluída com sucesso!');
      carregarTurmas();
    } catch (error) {
      setTurmas((prev) => prev.filter((t) => t.id !== id));
      setTurmaMessage('Turma excluída com sucesso! (Modo Local)');
    }
  };

  const turmasFiltradas = turmas.filter((turma) =>
    Object.values(turma).some((val) =>
      String(val).toLowerCase().includes(searchTurma.toLowerCase())
    )
  );

  // CADASTRO DE NOTA
  const handleNotaSubmit = async (event) => {
    event.preventDefault();
    const valorNota = parseFloat(notaForm.nota);

    if (!notaForm.aluno_id || !notaForm.disciplina || isNaN(valorNota)) {
      setNotaMessage('Por favor, preencha todos os campos corretamente.');
      return;
    }

    if (valorNota < 0 || valorNota > 10) {
      setNotaMessage('A nota deve estar entre 0 e 10.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/notas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...notaForm,
          aluno_id: parseInt(notaForm.aluno_id),
          nota: valorNota,
        }),
      });

      if (!response.ok) {
        const novaNota = {
          id: Date.now(),
          aluno_id: parseInt(notaForm.aluno_id),
          disciplina: notaForm.disciplina,
          bimestre: notaForm.bimestre,
          nota: valorNota,
        };
        setNotas((prev) => [...prev, novaNota]);
      } else {
        carregarNotas();
      }

      setNotaMessage('Nota salva com sucesso!');
      setNotaForm(initialNotaForm);
    } catch (error) {
      const novaNota = {
        id: Date.now(),
        aluno_id: parseInt(notaForm.aluno_id),
        disciplina: notaForm.disciplina,
        bimestre: notaForm.bimestre,
        nota: valorNota,
      };
      setNotas((prev) => [...prev, novaNota]);
      setNotaMessage('Nota salva com sucesso! (Modo Local)');
      setNotaForm(initialNotaForm);
    }
  };

  // TELA DE LOGIN ANIMADA
  if (!loggedIn) {
    return (
      <Box sx={{ backgroundColor: '#f1f5f9', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CssBaseline />
        <Container maxWidth="xs">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid #e2e8f0', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', bgcolor: '#ffffff' }}>
              <Stack spacing={3} alignItems="center">
                <Avatar sx={{ bgcolor: '#0284c7', width: 56, height: 56 }}>
                  <SchoolIcon sx={{ fontSize: 32 }} />
                </Avatar>
                <Box textAlign="center">
                  <Typography variant="h5" fontWeight={700} color="#0f172a" gutterBottom>
                    Portal Escolar
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Acesso restrito ao painel administrativo.
                  </Typography>
                </Box>

                <form onSubmit={handleLoginSubmit} style={{ width: '100%' }}>
                  <Stack spacing={2.5}>
                    <TextField
                      fullWidth
                      label="Usuário"
                      name="usuario"
                      size="small"
                      value={loginForm.usuario}
                      onChange={handleLoginChange}
                    />
                    <TextField
                      fullWidth
                      label="Senha"
                      name="senha"
                      type="password"
                      size="small"
                      value={loginForm.senha}
                      onChange={handleLoginChange}
                    />
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button type="submit" variant="contained" size="large" fullWidth sx={{ py: 1.2, borderRadius: 2, textTransform: 'none', fontWeight: 600, bgcolor: '#0284c7', '&:hover': { bgcolor: '#0369a1' } }}>
                        Entrar no Sistema
                      </Button>
                    </motion.div>
                  </Stack>
                </form>

                <Typography variant="caption" color="text.secondary" textAlign="center">
                  Ambiente de testes / Demonstração
                </Typography>
              </Stack>
            </Paper>
          </motion.div>
        </Container>
      </Box>
    );
  }

  // CÁLCULOS GERAIS PARA METRICAS
  const totalAlunos = alunos.length;
  const totalTurmas = turmas.length;
  const somaNotasGeral = notas.reduce((acc, curr) => acc + curr.nota, 0);
  const mediaGeralTurma = notas.length > 0 ? (somaNotasGeral / notas.length).toFixed(1) : 0;

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <CssBaseline />

      {/* HEADER / APPBAR */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#1e293b', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <SchoolIcon sx={{ color: '#38bdf8', fontSize: 28 }} />
            <Typography variant="h6" noWrap fontWeight={700} sx={{ letterSpacing: 0.5, color: '#f8fafc' }}>
              Painel Escolar
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" sx={{ color: '#94a3b8', display: { xs: 'none', sm: 'block' } }}>
              Olá, <strong>{loginForm.usuario || 'Administrador'}</strong>
            </Typography>
            <Button
              variant="outlined"
              size="small"
              startIcon={<LogoutIcon />}
              onClick={() => setLoggedIn(false)}
              sx={{ color: '#ef4444', borderColor: '#ef4444', borderRadius: 2, textTransform: 'none', '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.08)' } }}
            >
              Sair
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* SIDEBAR / DRAWER */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#0f172a', color: '#fff', borderRight: 'none' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', mt: 2, px: 1 }}>
          <List>
            {menuItems.map((item) => {
              const isSelected = view === item.key;
              return (
                <ListItem key={item.key} disablePadding sx={{ mb: 0.5 }}>
                  <ListItemButton
                    selected={isSelected}
                    onClick={() => setView(item.key)}
                    sx={{
                      borderRadius: 2,
                      py: 1.2,
                      px: 2,
                      '&.Mui-selected': { backgroundColor: 'rgba(56, 189, 248, 0.15)', borderLeft: '4px solid #38bdf8' },
                      '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.05)' },
                    }}
                  >
                    <ListItemIcon sx={{ color: isSelected ? '#38bdf8' : '#94a3b8', minWidth: 40 }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: isSelected ? 600 : 400, color: isSelected ? '#38bdf8' : '#e2e8f0' }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>

      {/* CONTEÚDO PRINCIPAL */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: `calc(100% - ${drawerWidth}px)` }}>
        <Toolbar />
        <Container maxWidth="xl" sx={{ mt: 1, mb: 4 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >

              {/* DASHBOARD */}
              {view === 'dashboard' && (
                <Box>
                  <Typography variant="h5" fontWeight={700} color="#0f172a" sx={{ mb: 3 }}>
                    Visão Geral do Sistema
                  </Typography>

                  <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={4}>
                      <motion.div whileHover={{ y: -4 }}>
                        <Card variant="outlined" sx={{ borderRadius: 3, borderColor: '#e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                          <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ bgcolor: '#e0f2fe', color: '#0284c7', width: 52, height: 52 }}>
                              <PeopleIcon />
                            </Avatar>
                            <Box>
                              <Typography variant="body2" color="text.secondary">Total de Alunos</Typography>
                              <Typography variant="h4" fontWeight={700} color="#0f172a">{totalAlunos}</Typography>
                            </Box>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <motion.div whileHover={{ y: -4 }}>
                        <Card variant="outlined" sx={{ borderRadius: 3, borderColor: '#e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                          <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ bgcolor: '#fef3c7', color: '#d97706', width: 52, height: 52 }}>
                              <ClassIcon />
                            </Avatar>
                            <Box>
                              <Typography variant="body2" color="text.secondary">Turmas Ativas</Typography>
                              <Typography variant="h4" fontWeight={700} color="#0f172a">{totalTurmas}</Typography>
                            </Box>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <motion.div whileHover={{ y: -4 }}>
                        <Card variant="outlined" sx={{ borderRadius: 3, borderColor: '#e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                          <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ bgcolor: '#dcfce7', color: '#16a34a', width: 52, height: 52 }}>
                              <AnalyticsIcon />
                            </Avatar>
                            <Box>
                              <Typography variant="body2" color="text.secondary">Média Geral da Escola</Typography>
                              <Typography variant="h4" fontWeight={700} color="#16a34a">{mediaGeralTurma}</Typography>
                            </Box>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Grid>
                  </Grid>

                  <Paper variant="outlined" sx={{ p: 4, borderRadius: 3, borderColor: '#e2e8f0', bgcolor: '#ffffff' }}>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      Acesso Rápido
                    </Typography>
                    <Typography color="text.secondary" sx={{ mb: 3 }}>
                      Selecione um dos módulos na barra lateral para gerenciar alunos, turmas e notas.
                    </Typography>
                    <Grid container spacing={2}>
                      {menuItems.slice(1, 5).map((item) => (
                        <Grid item xs={12} sm={6} md={3} key={item.key}>
                          <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => setView(item.key)}
                            sx={{
                              p: 2,
                              borderRadius: 2,
                              justifyContent: 'flex-start',
                              textAlign: 'left',
                              borderColor: '#cbd5e1',
                              color: '#334155',
                              '&:hover': { borderColor: '#0284c7', bgcolor: '#f0f9ff' }
                            }}
                          >
                            <Box>
                              <Typography fontWeight={600}>{item.label}</Typography>
                              <Typography variant="caption" color="text.secondary" display="block">{item.description}</Typography>
                            </Box>
                          </Button>
                        </Grid>
                      ))}
                    </Grid>
                  </Paper>
                </Box>
              )}

              {/* TELA DE ALUNOS */}
              {view === 'alunos' && (
                <Box>
                  <Typography variant="h5" fontWeight={700} color="#0f172a" sx={{ mb: 2.5 }}>
                    {editingAlunoId ? 'Editar Aluno' : 'Cadastro de Alunos'}
                  </Typography>

                  {message && (
                    <Alert severity={message.includes('sucesso') ? 'success' : 'error'} sx={{ mb: 3, borderRadius: 2 }}>
                      {message}
                    </Alert>
                  )}

                  <Paper variant="outlined" sx={{ p: { xs: 2.5, md: 3 }, borderRadius: 3, mb: 4, borderColor: '#e2e8f0', bgcolor: '#ffffff' }}>
                    <form onSubmit={handleSubmit}>
                      <Grid container spacing={2.5}>
                        <Grid item xs={12} md={6}>
                          <TextField fullWidth label="Nome" name="nome" value={form.nome} onChange={handleChange} required size="small" />
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <TextField fullWidth label="E-mail" name="email" type="email" value={form.email} onChange={handleChange} required size="small" />
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <TextField fullWidth label="Data de nascimento" name="data_nascimento" type="date" value={form.data_nascimento} onChange={handleChange} InputLabelProps={{ shrink: true }} required size="small" />
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <TextField select fullWidth label="Série" name="serie" value={form.serie} onChange={handleChange} required size="small">
                            <MenuItem value="1º Ano">1º Ano</MenuItem>
                            <MenuItem value="2º Ano">2º Ano</MenuItem>
                            <MenuItem value="3º Ano">3º Ano</MenuItem>
                            <MenuItem value="4º Ano">4º Ano</MenuItem>
                            <MenuItem value="5º Ano">5º Ano</MenuItem>
                          </TextField>
                        </Grid>

                        <Grid item xs={12} md={4}>
                          <TextField fullWidth label="CPF" name="cpf" value={form.cpf} onChange={handleChange} size="small" />
                        </Grid>

                        <Grid item xs={12} md={4}>
                          <TextField fullWidth label="Telefone" name="telefone" value={form.telefone} onChange={handleChange} size="small" />
                        </Grid>

                        <Grid item xs={12} md={4}>
                          <TextField fullWidth label="Endereço" name="endereco" value={form.endereco} onChange={handleChange} size="small" />
                        </Grid>
                      </Grid>

                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 3 }}>
                        <motion.div whileTap={{ scale: 0.98 }}>
                          <Button type="submit" variant="contained" size="medium" sx={{ borderRadius: 2, px: 4, textTransform: 'none', fontWeight: 600, bgcolor: '#0284c7', '&:hover': { bgcolor: '#0369a1' } }}>
                            {editingAlunoId ? 'Atualizar aluno' : 'Salvar aluno'}
                          </Button>
                        </motion.div>
                        <Button
                          variant="outlined"
                          size="medium"
                          color="secondary"
                          sx={{ borderRadius: 2, px: 3, textTransform: 'none' }}
                          onClick={() => {
                            setForm(initialForm);
                            setEditingAlunoId(null);
                          }}
                        >
                          {editingAlunoId ? 'Cancelar edição' : 'Limpar'}
                        </Button>
                      </Stack>
                    </form>
                  </Paper>

                  <Card variant="outlined" sx={{ borderRadius: 3, borderColor: '#e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                    <CardContent sx={{ p: 3 }}>
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
                        <Typography variant="h6" fontWeight={600}>Alunos Cadastrados</Typography>
                        <TextField
                          size="small"
                          placeholder="Pesquisar aluno..."
                          value={searchAluno}
                          onChange={(e) => setSearchAluno(e.target.value)}
                          sx={{ minWidth: 260 }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon color="action" />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Box>

                      {alunosFiltrados.length === 0 ? (
                        <Typography color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
                          Nenhum aluno encontrado.
                        </Typography>
                      ) : (
                        <TableContainer component={Paper} variant="outlined" sx={{ borderColor: '#f1f5f9' }}>
                          <Table sx={{ minWidth: 650 }} size="small">
                            <TableHead sx={{ backgroundColor: '#f8fafc' }}>
                              <TableRow>
                                <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Nome</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#475569' }}>E-mail</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Série</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 700, color: '#475569' }}>Ações</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {alunosFiltrados.map((aluno) => (
                                <TableRow key={aluno.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                  <TableCell fontWeight={500}>{aluno.nome}</TableCell>
                                  <TableCell>{aluno.email}</TableCell>
                                  <TableCell>{aluno.serie}</TableCell>
                                  <TableCell align="right">
                                    <IconButton color="primary" onClick={() => handleEditAluno(aluno)} size="small" sx={{ mr: 1 }}>
                                      <EditIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleDeleteAluno(aluno.id)} size="small">
                                      <DeleteIcon fontSize="small" />
                                    </IconButton>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      )}
                    </CardContent>
                  </Card>
                </Box>
              )}

              {/* TELA DE TURMAS */}
              {view === 'turmas' && (
                <Box>
                  <Typography variant="h5" fontWeight={700} color="#0f172a" sx={{ mb: 2.5 }}>
                    {editingTurmaId ? 'Editar Turma' : 'Cadastro de Turmas'}
                  </Typography>

                  {turmaMessage && (
                    <Alert severity={turmaMessage.includes('sucesso') ? 'success' : 'error'} sx={{ mb: 3, borderRadius: 2 }}>
                      {turmaMessage}
                    </Alert>
                  )}

                  <Paper variant="outlined" sx={{ p: { xs: 2.5, md: 3 }, borderRadius: 3, mb: 4, borderColor: '#e2e8f0', bgcolor: '#ffffff' }}>
                    <form onSubmit={handleTurmaSubmit}>
                      <Grid container spacing={2.5}>
                        <Grid item xs={12} md={4}>
                          <TextField fullWidth label="Nome da Turma" name="nome" value={turmaForm.nome} onChange={handleTurmaChange} placeholder="Ex.: 3º DS" required size="small" />
                        </Grid>

                        <Grid item xs={12} md={4}>
                          <TextField select fullWidth label="Série" name="serie" value={turmaForm.serie} onChange={handleTurmaChange} required size="small">
                            <MenuItem value="1º Ano">1º Ano</MenuItem>
                            <MenuItem value="2º Ano">2º Ano</MenuItem>
                            <MenuItem value="3º Ano">3º Ano</MenuItem>
                            <MenuItem value="4º Ano">4º Ano</MenuItem>
                            <MenuItem value="5º Ano">5º Ano</MenuItem>
                          </TextField>
                        </Grid>

                        <Grid item xs={12} md={4}>
                          <TextField fullWidth label="Ano Letivo" name="ano" type="number" value={turmaForm.ano} onChange={handleTurmaChange} placeholder="2026" required size="small" />
                        </Grid>
                      </Grid>

                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 3 }}>
                        <motion.div whileTap={{ scale: 0.98 }}>
                          <Button type="submit" variant="contained" size="medium" sx={{ borderRadius: 2, px: 4, textTransform: 'none', fontWeight: 600, bgcolor: '#0284c7', '&:hover': { bgcolor: '#0369a1' } }}>
                            {editingTurmaId ? 'Atualizar turma' : 'Salvar turma'}
                          </Button>
                        </motion.div>
                        <Button
                          variant="outlined"
                          size="medium"
                          color="secondary"
                          sx={{ borderRadius: 2, px: 3, textTransform: 'none' }}
                          onClick={() => {
                            setTurmaForm(initialTurmaForm);
                            setEditingTurmaId(null);
                          }}
                        >
                          {editingTurmaId ? 'Cancelar edição' : 'Limpar'}
                        </Button>
                      </Stack>
                    </form>
                  </Paper>

                  <Card variant="outlined" sx={{ borderRadius: 3, borderColor: '#e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                    <CardContent sx={{ p: 3 }}>
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
                        <Typography variant="h6" fontWeight={600}>Turmas Cadastradas</Typography>
                        <TextField
                          size="small"
                          placeholder="Pesquisar turma..."
                          value={searchTurma}
                          onChange={(e) => setSearchTurma(e.target.value)}
                          sx={{ minWidth: 260 }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon color="action" />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Box>

                      {turmasFiltradas.length === 0 ? (
                        <Typography color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
                          Nenhuma turma encontrada.
                        </Typography>
                      ) : (
                        <TableContainer component={Paper} variant="outlined" sx={{ borderColor: '#f1f5f9' }}>
                          <Table sx={{ minWidth: 600 }} size="small">
                            <TableHead sx={{ backgroundColor: '#f8fafc' }}>
                              <TableRow>
                                <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Nome da Turma</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Série</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Ano Letivo</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 700, color: '#475569' }}>Ações</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {turmasFiltradas.map((turma) => (
                                <TableRow key={turma.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                  <TableCell fontWeight={500}>{turma.nome}</TableCell>
                                  <TableCell>{turma.serie}</TableCell>
                                  <TableCell>{turma.ano}</TableCell>
                                  <TableCell align="right">
                                    <IconButton color="primary" onClick={() => handleEditTurma(turma)} size="small" sx={{ mr: 1 }}>
                                      <EditIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleDeleteTurma(turma.id)} size="small">
                                      <DeleteIcon fontSize="small" />
                                    </IconButton>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      )}
                    </CardContent>
                  </Card>
                </Box>
              )}

              {/* TELA DE NOTAS */}
              {view === 'notas' && (
                <Box>
                  <Typography variant="h5" fontWeight={700} color="#0f172a" sx={{ mb: 2.5 }}>
                    Lançamento de Notas e Boletim Digital
                  </Typography>

                  {notaMessage && (
                    <Alert severity={notaMessage.includes('sucesso') ? 'success' : 'error'} sx={{ mb: 3, borderRadius: 2 }}>
                      {notaMessage}
                    </Alert>
                  )}

                  <Paper variant="outlined" sx={{ p: { xs: 2.5, md: 3 }, borderRadius: 3, mb: 4, borderColor: '#e2e8f0', bgcolor: '#ffffff' }}>
                    <form onSubmit={handleNotaSubmit}>
                      <Grid container spacing={2.5}>
                        <Grid item xs={12} md={4}>
                          <TextField select fullWidth label="Aluno" name="aluno_id" value={notaForm.aluno_id} onChange={handleNotaChange} required size="small">
                            {alunos.length === 0 ? (
                              <MenuItem disabled value="">Nenhum aluno cadastrado</MenuItem>
                            ) : (
                              alunos.map((a) => <MenuItem key={a.id} value={a.id}>{a.nome}</MenuItem>)
                            )}
                          </TextField>
                        </Grid>

                        <Grid item xs={12} md={3}>
                          <TextField fullWidth label="Disciplina" name="disciplina" value={notaForm.disciplina} onChange={handleNotaChange} placeholder="Ex.: Front-End" required size="small" />
                        </Grid>

                        <Grid item xs={12} md={3}>
                          <TextField select fullWidth label="Bimestre" name="bimestre" value={notaForm.bimestre} onChange={handleNotaChange} required size="small">
                            <MenuItem value="1º Bimestre">1º Bimestre</MenuItem>
                            <MenuItem value="2º Bimestre">2º Bimestre</MenuItem>
                            <MenuItem value="3º Bimestre">3º Bimestre</MenuItem>
                            <MenuItem value="4º Bimestre">4º Bimestre</MenuItem>
                          </TextField>
                        </Grid>

                        <Grid item xs={12} md={2}>
                          <TextField fullWidth label="Nota" name="nota" type="number" inputProps={{ step: '0.1', min: '0', max: '10' }} value={notaForm.nota} onChange={handleNotaChange} required size="small" />
                        </Grid>
                      </Grid>

                      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                        <motion.div whileTap={{ scale: 0.98 }}>
                          <Button type="submit" variant="contained" size="medium" sx={{ borderRadius: 2, px: 4, textTransform: 'none', fontWeight: 600, bgcolor: '#0284c7', '&:hover': { bgcolor: '#0369a1' } }}>
                            Salvar Nota
                          </Button>
                        </motion.div>
                        <Button variant="outlined" size="medium" color="secondary" sx={{ borderRadius: 2, px: 3, textTransform: 'none' }} onClick={() => setNotaForm(initialNotaForm)}>
                          Limpar
                        </Button>
                      </Stack>
                    </form>
                  </Paper>

                  <Card variant="outlined" sx={{ mb: 4, borderRadius: 3, borderColor: '#e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h6" fontWeight={600} gutterBottom>
                        Consultar Desempenho / Mini Boletim
                      </Typography>

                      <Grid container spacing={2} alignItems="center" sx={{ mb: 3, mt: 0.5 }}>
                        <Grid item xs={12} md={6}>
                          <TextField select fullWidth size="small" label="Filtrar por Aluno" value={filtroAlunoId} onChange={(e) => setFiltroAlunoId(e.target.value)}>
                            <MenuItem value="">Todos os Alunos</MenuItem>
                            {alunos.map((a) => <MenuItem key={a.id} value={a.id}>{a.nome}</MenuItem>)}
                          </TextField>
                        </Grid>
                      </Grid>

                      {(() => {
                        const notasFiltradas = filtroAlunoId
                          ? notas.filter((n) => n.aluno_id === parseInt(filtroAlunoId))
                          : notas;

                        const soma = notasFiltradas.reduce((acc, curr) => acc + curr.nota, 0);
                        const media = notasFiltradas.length > 0 ? (soma / notasFiltradas.length).toFixed(1) : 0;

                        let statusTexto = 'Sem Dados';
                        let statusCor = 'text.secondary';

                        if (notasFiltradas.length > 0) {
                          if (media >= 7.0) {
                            statusTexto = '🟢 Aprovado';
                            statusCor = '#16a34a';
                          } else if (media >= 5.0) {
                            statusTexto = '🟡 Recuperação';
                            statusCor = '#d97706';
                          } else {
                            statusTexto = '🔴 Reprovado';
                            statusCor = '#dc2626';
                          }
                        }

                        return (
                          <Paper variant="outlined" sx={{ p: 2.5, mb: 3, bgcolor: '#f8fafc', borderRadius: 2, borderColor: '#e2e8f0' }}>
                            <Grid container spacing={2}>
                              <Grid item xs={12} md={6}>
                                <Typography variant="subtitle1" color="#0f172a">
                                  <strong>Média Geral:</strong> {media}
                                </Typography>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <Typography variant="subtitle1" sx={{ color: statusCor }}>
                                  <strong>Situação:</strong> {statusTexto}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Paper>
                        );
                      })()}

                      <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1.5 }}>
                        Notas Cadastradas
                      </Typography>

                      {notas.length === 0 ? (
                        <Typography color="text.secondary">Nenhuma nota lançada até o momento.</Typography>
                      ) : (
                        <Stack spacing={1.5}>
                          {(filtroAlunoId
                            ? notas.filter((n) => n.aluno_id === parseInt(filtroAlunoId))
                            : notas
                          ).map((item) => {
                            const alunoObj = alunos.find((a) => a.id === item.aluno_id);

                            return (
                              <motion.div key={item.id} whileHover={{ x: 3 }}>
                                <Box
                                  sx={{
                                    p: 2,
                                    border: '1px solid #e2e8f0',
                                    borderRadius: 2,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    bgcolor: '#ffffff',
                                    '&:hover': { borderColor: '#38bdf8', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' },
                                  }}
                                >
                                  <Box>
                                    <Typography fontWeight={600} color="#0f172a">
                                      {alunoObj ? alunoObj.nome : 'Aluno não localizado'}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      {item.disciplina} • {item.bimestre}
                                    </Typography>
                                  </Box>
                                  <Typography variant="h6" fontWeight={700} color="#0284c7">
                                    {item.nota.toFixed(1)}
                                  </Typography>
                                </Box>
                              </motion.div>
                            );
                          })}
                        </Stack>
                      )}
                    </CardContent>
                  </Card>
                </Box>
              )}

              {/* OUTRAS TELAS */}
              {['professores', 'financeiro', 'relatorios'].includes(view) && (
                <Paper variant="outlined" sx={{ p: 4, borderRadius: 3, borderColor: '#e2e8f0', bgcolor: '#ffffff' }}>
                  <Typography variant="h6" fontWeight={600} gutterBottom color="#0f172a">
                    {menuItems.find((item) => item.key === view)?.label}
                  </Typography>
                  <Typography color="text.secondary">
                    Esta área ficará disponível para a próxima etapa do sistema escolar.
                  </Typography>
                </Paper>
              )}

            </motion.div>
          </AnimatePresence>
        </Container>
      </Box>
    </Box>
  );
}

export default App;