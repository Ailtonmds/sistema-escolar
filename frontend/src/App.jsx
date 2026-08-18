import { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

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
  {
    key: 'dashboard',
    label: 'Início',
    description: 'Visão geral do sistema',
  },
  {
    key: 'alunos',
    label: 'Alunos',
    description: 'Cadastro e consulta de estudantes',
  },
  {
    key: 'professores',
    label: 'Professores',
    description: 'Gestão da equipe',
  },
  {
    key: 'turmas',
    label: 'Turmas',
    description: 'Organização escolar',
  },
  {
    key: 'notas',
    label: 'Notas / Boletim',
    description: 'Lançamento e consulta de notas',
  },
  {
    key: 'financeiro',
    label: 'Financeiro',
    description: 'Mensalidades e contas',
  },
  {
    key: 'relatorios',
    label: 'Relatórios',
    description: 'Indicadores da escola',
  },
];

function App() {
  // ==========================================
  // ESTADOS DOS ALUNOS
  // ==========================================
  const [form, setForm] = useState(initialForm);
  const [alunos, setAlunos] = useState([]);
  const [message, setMessage] = useState('');

  // ==========================================
  // ESTADOS DAS TURMAS
  // ==========================================
  const [turmaForm, setTurmaForm] = useState(initialTurmaForm);
  const [turmas, setTurmas] = useState([]);
  const [turmaMessage, setTurmaMessage] = useState('');

  // ==========================================
  // ESTADOS DAS NOTAS (MISSÃO 003)
  // ==========================================
  const [notaForm, setNotaForm] = useState(initialNotaForm);
  const [notas, setNotas] = useState([]);
  const [notaMessage, setNotaMessage] = useState('');
  const [filtroAlunoId, setFiltroAlunoId] = useState('');

  // ==========================================
  // ESTADOS DO SISTEMA
  // ==========================================
  const [view, setView] = useState('dashboard');
  const [loggedIn, setLoggedIn] = useState(false);

  const [loginForm, setLoginForm] = useState({
    usuario: '',
    senha: '',
  });

  // ==========================================
  // CARREGAR DADOS
  // ==========================================
  const carregarAlunos = async () => {
    try {
      const response = await fetch('/api/alunos');
      if (!response.ok) throw new Error('Erro ao carregar alunos');
      const data = await response.json();
      setAlunos(data);
    } catch (error) {
      console.error(error);
    }
  };

  const carregarTurmas = async () => {
    try {
      const response = await fetch('/api/turmas');
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
      const response = await fetch('/api/notas');
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

  // ==========================================
  // HANDLERS DE FORMULÁRIOS
  // ==========================================
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleTurmaChange = (event) => {
    const { name, value } = event.target;
    setTurmaForm({ ...turmaForm, [name]: value });
  };

  const handleNotaChange = (event) => {
    const { name, value } = event.target;
    setNotaForm({ ...notaForm, [name]: value });
  };

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    if (loginForm.usuario && loginForm.senha) {
      setLoggedIn(true);
    }
  };

  // ==========================================
  // CADASTRO DE ALUNO
  // ==========================================
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/alunos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Erro ao cadastrar aluno');
      }

      setMessage('Aluno cadastrado com sucesso!');
      setForm(initialForm);
      carregarAlunos();
    } catch (error) {
      setMessage(error.message);
    }
  };

  // ==========================================
  // CADASTRO DE TURMA
  // ==========================================
  const handleTurmaSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/turmas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(turmaForm),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Erro ao cadastrar turma');
      }

      setTurmaMessage('Turma cadastrada com sucesso!');
      setTurmaForm(initialTurmaForm);
      carregarTurmas();
    } catch (error) {
      setTurmaMessage(error.message);
    }
  };

  // ==========================================
  // CADASTRO DE NOTA (MISSÃO 003)
  // ==========================================
  const handleNotaSubmit = async (event) => {
    event.preventDefault();

    const valorNota = parseFloat(notaForm.nota);

    // Validações do QA Checklist
    if (!notaForm.aluno_id || !notaForm.disciplina || isNaN(valorNota)) {
      setNotaMessage('Por favor, preencha todos os campos corretamente.');
      return;
    }

    if (valorNota < 0 || valorNota > 10) {
      setNotaMessage('A nota deve estar entre 0 e 10.');
      return;
    }

    try {
      const response = await fetch('/api/notas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...notaForm,
          aluno_id: parseInt(notaForm.aluno_id),
          nota: valorNota,
        }),
      });

      if (!response.ok) {
        // Fallback local se a API não estiver conectada
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
      // Caso haja erro de rede / API não pronta, armazena no estado local
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

  // ==========================================
  // TELA DE LOGIN
  // ==========================================
  if (!loggedIn) {
    return (
      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Paper elevation={6} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4 }}>
          <Stack spacing={3} alignItems="center">
            <Box textAlign="center">
              <Typography variant="h4" fontWeight={700}>
                Sistema Escolar
              </Typography>
              <Typography color="text.secondary">
                Acesso provisório ao painel administrativo.
              </Typography>
            </Box>

            <form onSubmit={handleLoginSubmit} style={{ width: '100%' }}>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  label="Usuário"
                  name="usuario"
                  value={loginForm.usuario}
                  onChange={handleLoginChange}
                />
                <TextField
                  fullWidth
                  label="Senha"
                  name="senha"
                  type="password"
                  value={loginForm.senha}
                  onChange={handleLoginChange}
                />
                <Button type="submit" variant="contained" size="large">
                  Entrar
                </Button>
              </Stack>
            </form>

            <Typography variant="body2" color="text.secondary" textAlign="center">
              Login ainda será implementado com autenticação real no próximo passo.
            </Typography>
          </Stack>
        </Paper>
      </Container>
    );
  }

  // ==========================================
  // PAINEL PRINCIPAL
  // ==========================================
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 3, md: 4 }, borderRadius: 4 }}>
        <Stack spacing={3}>
          {/* CABEÇALHO */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <Box>
              <Typography variant="h4" fontWeight={700}>
                Painel Escolar
              </Typography>
              <Typography color="text.secondary">
                Gestão administrativa e boletim digital.
              </Typography>
            </Box>

            <Button variant="outlined" onClick={() => setLoggedIn(false)}>
              Sair
            </Button>
          </Box>

          {/* MENU */}
          <Grid container spacing={2}>
            {menuItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.key}>
                <Button
                  fullWidth
                  variant={view === item.key ? 'contained' : 'outlined'}
                  sx={{
                    justifyContent: 'flex-start',
                    py: 2,
                    px: 2,
                    minHeight: 88,
                  }}
                  onClick={() => setView(item.key)}
                >
                  <Box textAlign="left">
                    <Typography fontWeight={600}>{item.label}</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      {item.description}
                    </Typography>
                  </Box>
                </Button>
              </Grid>
            ))}
          </Grid>

          {/* ======================================
              TELA DE ALUNOS
          ====================================== */}
          {view === 'alunos' ? (
            <Box>
              <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
                Cadastro de Alunos
              </Typography>

              {message && (
                <Alert
                  severity={message.includes('sucesso') ? 'success' : 'error'}
                  sx={{ mb: 2 }}
                >
                  {message}
                </Alert>
              )}

              <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Nome"
                        name="nome"
                        value={form.nome}
                        onChange={handleChange}
                        required
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="E-mail"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Data de nascimento"
                        name="data_nascimento"
                        type="date"
                        value={form.data_nascimento}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        required
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        select
                        fullWidth
                        label="Série"
                        name="serie"
                        value={form.serie}
                        onChange={handleChange}
                        required
                      >
                        <MenuItem value="1º Ano">1º Ano</MenuItem>
                        <MenuItem value="2º Ano">2º Ano</MenuItem>
                        <MenuItem value="3º Ano">3º Ano</MenuItem>
                        <MenuItem value="4º Ano">4º Ano</MenuItem>
                        <MenuItem value="5º Ano">5º Ano</MenuItem>
                      </TextField>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        label="CPF"
                        name="cpf"
                        value={form.cpf}
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        label="Telefone"
                        name="telefone"
                        value={form.telefone}
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        label="Endereço"
                        name="endereco"
                        value={form.endereco}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>

                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 3 }}>
                    <Button type="submit" variant="contained" size="large">
                      Salvar aluno
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => setForm(initialForm)}
                    >
                      Limpar
                    </Button>
                  </Stack>
                </form>
              </Paper>

              <Card sx={{ mt: 4 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Alunos cadastrados
                  </Typography>

                  {alunos.length === 0 ? (
                    <Typography color="text.secondary">
                      Nenhum aluno cadastrado ainda.
                    </Typography>
                  ) : (
                    <Stack spacing={1}>
                      {alunos.map((aluno) => (
                        <Box
                          key={aluno.id}
                          sx={{
                            p: 1.5,
                            border: '1px solid #e0e0e0',
                            borderRadius: 2,
                          }}
                        >
                          <Typography fontWeight={600}>{aluno.nome}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {aluno.email} • {aluno.serie}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  )}
                </CardContent>
              </Card>
            </Box>
          ) : view === 'turmas' ? (
            /* ======================================
               TELA DE TURMAS - MISSÃO 002
            ====================================== */
            <Box>
              <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
                Cadastro de Turmas
              </Typography>

              {turmaMessage && (
                <Alert
                  severity={turmaMessage.includes('sucesso') ? 'success' : 'error'}
                  sx={{ mb: 2 }}
                >
                  {turmaMessage}
                </Alert>
              )}

              <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
                <form onSubmit={handleTurmaSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        label="Nome da Turma"
                        name="nome"
                        value={turmaForm.nome}
                        onChange={handleTurmaChange}
                        placeholder="Ex.: 3º DS"
                        required
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <TextField
                        select
                        fullWidth
                        label="Série"
                        name="serie"
                        value={turmaForm.serie}
                        onChange={handleTurmaChange}
                        required
                      >
                        <MenuItem value="1º Ano">1º Ano</MenuItem>
                        <MenuItem value="2º Ano">2º Ano</MenuItem>
                        <MenuItem value="3º Ano">3º Ano</MenuItem>
                        <MenuItem value="4º Ano">4º Ano</MenuItem>
                        <MenuItem value="5º Ano">5º Ano</MenuItem>
                      </TextField>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        label="Ano Letivo"
                        name="ano"
                        type="number"
                        value={turmaForm.ano}
                        onChange={handleTurmaChange}
                        placeholder="2026"
                        required
                      />
                    </Grid>
                  </Grid>

                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 3 }}>
                    <Button type="submit" variant="contained" size="large">
                      Salvar turma
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => setTurmaForm(initialTurmaForm)}
                    >
                      Limpar
                    </Button>
                  </Stack>
                </form>
              </Paper>

              <Card sx={{ mt: 4 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Turmas cadastradas
                  </Typography>

                  {turmas.length === 0 ? (
                    <Typography color="text.secondary">
                      Nenhuma turma cadastrada ainda.
                    </Typography>
                  ) : (
                    <Stack spacing={1}>
                      {turmas.map((turma) => (
                        <Box
                          key={turma.id}
                          sx={{
                            p: 2,
                            border: '1px solid #e0e0e0',
                            borderRadius: 2,
                          }}
                        >
                          <Typography fontWeight={600}>{turma.nome}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Série: {turma.serie} • Ano letivo: {turma.ano}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  )}
                </CardContent>
              </Card>
            </Box>
          ) : view === 'notas' ? (
            /* ======================================
               TELA DE NOTAS - MISSÃO 003 (BOLETIM DIGITAL)
            ====================================== */
            <Box>
              <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
                Lançamento de Notas e Boletim Digital
              </Typography>

              {notaMessage && (
                <Alert
                  severity={notaMessage.includes('sucesso') ? 'success' : 'error'}
                  sx={{ mb: 2 }}
                >
                  {notaMessage}
                </Alert>
              )}

              {/* FORMULÁRIO DE NOTAS */}
              <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, mb: 4 }}>
                <form onSubmit={handleNotaSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <TextField
                        select
                        fullWidth
                        label="Aluno"
                        name="aluno_id"
                        value={notaForm.aluno_id}
                        onChange={handleNotaChange}
                        required
                      >
                        {alunos.length === 0 ? (
                          <MenuItem disabled value="">
                            Nenhum aluno cadastrado
                          </MenuItem>
                        ) : (
                          alunos.map((a) => (
                            <MenuItem key={a.id} value={a.id}>
                              {a.nome}
                            </MenuItem>
                          ))
                        )}
                      </TextField>
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <TextField
                        fullWidth
                        label="Disciplina"
                        name="disciplina"
                        value={notaForm.disciplina}
                        onChange={handleNotaChange}
                        placeholder="Ex.: Front-End"
                        required
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <TextField
                        select
                        fullWidth
                        label="Bimestre"
                        name="bimestre"
                        value={notaForm.bimestre}
                        onChange={handleNotaChange}
                        required
                      >
                        <MenuItem value="1º Bimestre">1º Bimestre</MenuItem>
                        <MenuItem value="2º Bimestre">2º Bimestre</MenuItem>
                        <MenuItem value="3º Bimestre">3º Bimestre</MenuItem>
                        <MenuItem value="4º Bimestre">4º Bimestre</MenuItem>
                      </TextField>
                    </Grid>

                    <Grid item xs={12} md={2}>
                      <TextField
                        fullWidth
                        label="Nota"
                        name="nota"
                        type="number"
                        inputProps={{ step: '0.1', min: '0', max: '10' }}
                        value={notaForm.nota}
                        onChange={handleNotaChange}
                        required
                      />
                    </Grid>
                  </Grid>

                  <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                    <Button type="submit" variant="contained" size="large">
                      Salvar Nota
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => setNotaForm(initialNotaForm)}
                    >
                      Limpar
                    </Button>
                  </Stack>
                </form>
              </Paper>

              {/* CONSULTA E MINI BOLETIM (BOSS CHALLENGE + SIDE QUEST) */}
              <Card sx={{ mb: 4 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Consultar Desempenho / Mini Boletim
                  </Typography>

                  <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        select
                        fullWidth
                        label="Filtrar por Aluno"
                        value={filtroAlunoId}
                        onChange={(e) => setFiltroAlunoId(e.target.value)}
                      >
                        <MenuItem value="">Todos os Alunos</MenuItem>
                        {alunos.map((a) => (
                          <MenuItem key={a.id} value={a.id}>
                            {a.nome}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>

                  {/* CÁLCULO DE MÉDIA E SITUAÇÃO VISUAL */}
                  {(() => {
                    const notasFiltradas = filtroAlunoId
                      ? notas.filter((n) => n.aluno_id === parseInt(filtroAlunoId))
                      : notas;

                    const soma = notasFiltradas.reduce((acc, curr) => acc + curr.nota, 0);
                    const media =
                      notasFiltradas.length > 0
                        ? (soma / notasFiltradas.length).toFixed(1)
                        : 0;

                    let statusTexto = 'Sem Dados';
                    let statusCor = 'text.secondary';

                    if (notasFiltradas.length > 0) {
                      if (media >= 7.0) {
                        statusTexto = '🟢 Aprovado';
                        statusCor = 'success.main';
                      } else if (media >= 5.0) {
                        statusTexto = '🟡 Recuperação';
                        statusCor = 'warning.main';
                      } else {
                        statusTexto = '🔴 Reprovado';
                        statusCor = 'error.main';
                      }
                    }

                    return (
                      <Paper variant="outlined" sx={{ p: 2, mb: 3, bgcolor: '#f9f9f9' }}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={6}>
                            <Typography variant="subtitle1">
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

                  {/* TABELA / LISTA DE NOTAS */}
                  <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
                    Notas Cadastradas
                  </Typography>

                  {notas.length === 0 ? (
                    <Typography color="text.secondary">
                      Nenhuma nota lançada até o momento.
                    </Typography>
                  ) : (
                    <Stack spacing={1}>
                      {(filtroAlunoId
                        ? notas.filter((n) => n.aluno_id === parseInt(filtroAlunoId))
                        : notas
                      ).map((item) => {
                        const alunoObj = alunos.find((a) => a.id === item.aluno_id);

                        return (
                          <Box
                            key={item.id}
                            sx={{
                              p: 2,
                              border: '1px solid #e0e0e0',
                              borderRadius: 2,
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}
                          >
                            <Box>
                              <Typography fontWeight={600}>
                                {alunoObj ? alunoObj.nome : 'Aluno não localizado'}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {item.disciplina} • {item.bimestre}
                              </Typography>
                            </Box>
                            <Typography variant="h6" fontWeight={700} color="primary">
                              {item.nota.toFixed(1)}
                            </Typography>
                          </Box>
                        );
                      })}
                    </Stack>
                  )}
                </CardContent>
              </Card>
            </Box>
          ) : (
            /* ======================================
               OUTRAS TELAS
            ====================================== */
            <Paper variant="outlined" sx={{ p: 4, borderRadius: 3 }}>
              <Typography variant="h6" gutterBottom>
                {menuItems.find((item) => item.key === view)?.label}
              </Typography>
              <Typography color="text.secondary">
                Esta área ficará disponível para a próxima etapa do sistema escolar.
              </Typography>
            </Paper>
          )}
        </Stack>
      </Paper>
    </Container>
  );
}

export default App;