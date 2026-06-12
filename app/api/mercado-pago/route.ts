import { MercadoPagoConfig, Preference } from "mercadopago";
import { NextResponse } from "next/server";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
});

export async function POST() {
  try {
    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: [
          {
            id: "doacao",
            title: "Doação para o projeto",
            quantity: 1,
            unit_price: 10,
            currency_id: "BRL",
          },
        ],
      },
    });

    return NextResponse.json({
      preferenceId: result.id,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao criar preferência" },
      { status: 500 }
    );
  }
}