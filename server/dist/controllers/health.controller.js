export const healthCheck = async (req, res, next) => {
    try {
        res.status(200).send(`Bandhu Care Server running on port ${process.env.PORT}`);
        return;
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=health.controller.js.map