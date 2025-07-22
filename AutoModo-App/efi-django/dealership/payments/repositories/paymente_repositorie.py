from payments.models import Payment
from typing import List, Optional


class PaymentRepository:
    def get_all(self) -> List[Payment]:
        return Payment.objects.all()

    def create(self, nombre: str) -> Payment.objects:
        return Payment.objects.create(
            name=nombre,
        )

    def get_by_id(self, id: int) -> Optional[Payment]:
        try:
            payment = Payment.objects.get(id=id)
        except:
            payment = None
        return payment

    def delete(self, payment: Payment):
        return payment.delete()

    def update(
        self,
        payment: Payment,
        nombre: str,
    ) -> Payment:
        payment.name = nombre
        payment.save()
