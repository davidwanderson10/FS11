
// Valida se o usuário tem perfil de admin antes de permitir a criação de um autor
export async function validateAdmin(req, res, next) {
    try {
        const usuario = req.usuario;

        if (usuario.perfil !== 'admin') {
            return res.status(403).json({ error: 'Privilégios insuficientes para realizar esta operação.' });
        } 
        next(); // Permite que a requisição continue para o próximo middleware ou rota
    } catch (error) {
        console.error('Erro ao validar perfil do usuário:', error);
        throw error; // Re-throw the error to be handled by the calling function
    }
}
