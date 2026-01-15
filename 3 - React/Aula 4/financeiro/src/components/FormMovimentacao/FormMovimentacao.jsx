import { useState } from 'react';
import styles from './FormMovimentacao.module.css';

function FormMovimentacao({ onAdicionarMovimentacao }) {
  const [formData, setFormData] = useState({
    descricao: '',
    valor: '',
    data: '13/01/2026',
    categoria: 'Receita',
    tipo: 'Salário'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.descricao || !formData.valor) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    const novaMovimentacao = {
      ...formData,
      valor: parseFloat(formData.valor.replace(',', '.')),
      id: Date.now()
    };

    onAdicionarMovimentacao(novaMovimentacao);
    
    // Reset form
    setFormData({
      descricao: '',
      valor: '',
      data: new Date().toLocaleDateString('pt-BR'),
      categoria: 'Receita',
      tipo: 'Salário'
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Adicionar Movimentação</h2>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>DESCRIÇÃO</label>
          <input
            type="text"
            className={styles.input}
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            placeholder="Descrição da movimentação"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>VALOR</label>
          <div className={styles.inputWithCurrency}>
            <span className={styles.currency}>R$</span>
            <input
              type="text"
              className={styles.input}
              name="valor"
              value={formData.valor}
              onChange={handleChange}
              placeholder="0,00"
              required
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>DATA</label>
          <input
            type="text"
            className={styles.input}
            name="data"
            value={formData.data}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>CATEGORIA</label>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="categoria"
                value="Receita"
                checked={formData.categoria === 'Receita'}
                onChange={handleChange}
              />
              <span className={styles.radioCustom}></span>
              Receita
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="categoria"
                value="Casa"
                checked={formData.categoria === 'Casa'}
                onChange={handleChange}
              />
              <span className={styles.radioCustom}></span>
              Casa
            </label>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>TIPO</label>
          <select 
            className={styles.select}
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
          >
            <option value="Salário">Salário</option>
            <option value="Aluguel">Aluguel</option>
            <option value="Alimentação">Alimentação</option>
            <option value="Transporte">Transporte</option>
            <option value="Lazer">Lazer</option>
            <option value="Outros">Outros</option>
          </select>
        </div>

        <button type="submit" className={styles.button}>
          Adicionar Movimentação
        </button>
      </form>
    </div>
  );
}

export default FormMovimentacao;