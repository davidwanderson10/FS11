import { useState } from 'react';
import style from './FormMovimentacao.module.css';

function FormMovimentacao({ onAdicionarMovimentacao }) {
    const [formData, setFormData] = useState ({
        descricao: '',
        valor: '',
        categoria: 'Despesa',
        data: '',
        tipo: 'Salário'
    });

    // Função para lidar com mudanças nos campos do formulário
    const handleChange = (e) => {
        const { name, value } = e.target; // obtém o nome e valor do campo alterado
        setFormData((prevData) => ({
            ...prevData, // mantém os dados anteriores
            [name]: value // atualiza o campo específico
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // previne o comportamento padrão de envio do formulário

        if (!formData.descricao || !formData.valor || !formData.data) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const novaMovimentacao = {
            id: Date.now(),
            user: 'David',
            descricao: formData.descricao,
            valor: parseFloat(formData.valor.replace(',', '.')),
            categoria: formData.categoria,
            data: formData.data,
            tipo: formData.tipo
        };

        onAdicionarMovimentacao(novaMovimentacao); // chama a função passada via props para adicionar a nova movimentação

        // Reseta o formulário após o envio
        setFormData({
            descricao: '',
            valor: '',
            categoria: 'Receita',
            data: new Date().toLocaleDateString('pt-BR'),
            tipo: 'Salário'
        })
    }

    return (
        <div className={style.container}>
            <h2 className={style.title}>Adicionar Movimentação</h2>

            <form className={style.form} onSubmit={handleSubmit}>
                <div className={style.formGroup}>
                    <label className={style.label}>DESCRIÇÃO</label>
                    <input
                        type="text"
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleChange}
                        className={style.input}
                        placeholder='Descrição da movimentação'
                        required
                    />
                </div>

                <div className={style.formGroup}>
                    <label className={style.label}>VALOR</label>
                    <div className={style.inputWithCurrency}>
                        <span className={style.currency}>R$</span>
                        <input
                        type="text"
                        className={style.input}
                        name="valor"
                        value={formData.valor}
                        onChange={handleChange}
                        placeholder="0,00"
                        required
                        />
                    </div>
                </div>

                <div className={style.formGroup}>
                    <label className={style.label}>DATA</label>
                    <input
                        type="date"
                        className={style.input}
                        name="data"
                        value={formData.data}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={style.formGroup}>
                    <label className={style.label}>CATEGORIA</label>
                    <div className={style.radioGroup}>
                        <label className={style.radioLabel}>
                        <input
                            type="radio"
                            name="categoria"
                            value="Receita"
                            checked={formData.categoria === 'Receita'}
                            onChange={handleChange}
                        />
                        <span className={style.radioCustom}></span>
                        Receita
                        </label>
                        <label className={style.radioLabel}>
                        <input
                            type="radio"
                            name="categoria"
                            value="Despesa"
                            checked={formData.categoria === 'Despesa'}
                            onChange={handleChange}
                        />
                        <span className={style.radioCustom}></span>
                        Despesa
                        </label>
                    </div>
                </div>

                <div className={style.formGroup}>
                    <label className={style.label}>TIPO</label>
                    <select 
                        className={style.select}
                        name="tipo"
                        value={formData.tipo}
                        onChange={handleChange}
                    >
                        <option value="Salário">Salário</option>
                        <option value="Freelance">Freelance</option>
                        <option value="Investimentos">Investimentos</option>
                        <option value="Aluguel">Aluguel</option>
                        <option value="Alimentação">Alimentação</option>
                        <option value="Transporte">Transporte</option>
                        <option value="Lazer">Lazer</option>
                        <option value="Saúde">Saúde</option>
                        <option value="Educação">Educação</option>
                        <option value="Outros">Outros</option>
                    </select>
                </div>

                <button type="submit" className={style.button}>Adicionar Movimentação</button>
                
            </form>
        </div>

    );

}

export default FormMovimentacao;