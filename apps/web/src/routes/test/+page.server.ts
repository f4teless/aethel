// src/routes/test-error/+page.server.ts

export const load = () => {
	throw new Error('Intentional server error');
};
