import 'dotenv/config';
import jwt from 'jsonwebtoken';

export async function validateToken(req, res, next) {

  try {
    // 1. Receber o token do cabeçalho (Formato: Bearer <token>)
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ mensagem: 'Token não fornecido.' });
    }

    // 2. Verificar o token usando a mesma chave secreta da criação
    const secretKey = process.env.SECRET_KEY
    
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ mensagem: 'Token inválido ou expirado.' });
        }
        
        // 3. Token válido: dados do usuário (payload) estão em 'decoded'
        req.usuario = decoded; 
        next(); // Prossiga para a rota
    });

  } catch (err) {
    console.error('Validation failed (validateToken):', err);
    return res.status(500).json({ error: 'Database connection error' });
  }
}
