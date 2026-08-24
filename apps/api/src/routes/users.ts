import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  res.status(201).json({
  const { algoraEmail, alternativeMethod, alternativeAddress } = req.body;
      id: "stub-user-id",
      ...req.body
    if (alternativeMethod && alternativeAddress) {
      await prisma.user.update({
        where: { id },
        data: {
          payoutMethod: alternativeMethod,
          payoutAddress: alternativeAddress,
          payoutStatus: 'PENDING_MANUAL_PAYOUT',
        },
      });
      await notifications.sendPayoutAlert(id, alternativeMethod);
      return res.json({ message: 'Alternative payout method registered for manual processing.' });
    }

    await prisma.user.update({
    message: "User creation is not implemented yet."
  });
});

export default router;
