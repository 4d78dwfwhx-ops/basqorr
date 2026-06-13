"""
BASQOR FINANCIAL ENGINE - ESCROW & COMMISSION SPLITTING ALGORITHM
VERSION: 2.0.0-JEDDAH
INTEGRATED WITH config.env
"""

import os
from dotenv import load_dotenv
from typing import Dict

load_dotenv('config.env')


class BasqorFinancialEngine:

    def __init__(self):
        self.base_commission = float(os.getenv('BASE_MARKETPLACE_COMMISSION_RATE', 0.05))
        self.new_oem_commission = float(os.getenv('NEW_OEM_COMMISSION_RATE', 0.05))
        self.new_aftermarket_commission = float(os.getenv('NEW_AFTERMARKET_COMMISSION_RATE', 0.07))
        self.salvage_commission = float(os.getenv('SALVAGE_PART_COMMISSION_RATE', 0.10))
        self.delivery_commission = float(os.getenv('DELIVERY_COMMISSION_RATE', 0.15))
        self.sos_commission = float(os.getenv('SOS_SERVICE_COMMISSION_RATE', 0.12))
        self.auction_commission = float(os.getenv('AUCTION_COMMISSION_RATE', 0.03))
        self.delivery_rate_per_km = float(os.getenv('DELIVERY_FEE_PER_KM', 2.00))
        self.platform_shipping_cut = float(os.getenv('PLATFORM_SHIPPING_CUT_RATE', 0.10))
        self.min_delivery_fee = 15.00
        self.jeddah_delivery_fees = {
            "QUWAIZAH_TO_CENTRAL": float(os.getenv('DELIVERY_BASE_FEE_QUWAIZAH_TO_CENTRAL', 20.00)),
            "QUWAIZAH_TO_NORTH": float(os.getenv('DELIVERY_BASE_FEE_QUWAIZAH_TO_NORTH', 35.00)),
            "QUWAIZAH_TO_SOUTH": float(os.getenv('DELIVERY_BASE_FEE_QUWAIZAH_TO_SOUTH', 30.00)),
            "QUWAIZAH_TO_EAST": float(os.getenv('DELIVERY_BASE_FEE_QUWAIZAH_TO_EAST', 25.00)),
            "WITHIN_QUWAIZAH": float(os.getenv('DELIVERY_BASE_FEE_WITHIN_QUWAIZAH', 15.00))
        }
        self.rush_hour_surcharge = float(os.getenv('RUSH_HOUR_SURCHARGE', 0.30))
        self.urgent_surcharge = float(os.getenv('URGENT_ORDER_SURCHARGE', 0.50))
        self.emergency_surcharge = float(os.getenv('EMERGENCY_ORDER_SURCHARGE', 1.00))
        self.primary_city = os.getenv('PRIMARY_CITY', 'Jeddah')
        self.vat_rate = float(os.getenv('VAT_RATE', 0.15))
        self.min_commission = float(os.getenv('MIN_COMMISSION_SAR', 5.00))

    def calculate_order_split(
        self,
        part_base_price: float,
        distance_km: float,
        part_type: str = "USED_SALVAGE",
        order_type: str = "MARKETPLACE",
        urgency: str = "normal",
        is_rush_hour: bool = False,
        pickup_zone: str = "QUWAIZAH",
        dropoff_zone: str = "CENTRAL"
    ) -> Dict:

        commission_rates = {
            "NEW_OEM": self.new_oem_commission,
            "NEW_AFTERMARKET": self.new_aftermarket_commission,
            "USED_SALVAGE": self.salvage_commission,
            "DELIVERY_ONLY": self.delivery_commission,
            "SOS": self.sos_commission,
            "AUCTION": self.auction_commission
        }
        commission_rate = commission_rates.get(part_type, self.base_commission)
        platform_marketplace_fee = max(part_base_price * commission_rate, self.min_commission)
        zone_key = f"{pickup_zone}_TO_{dropoff_zone}"
        base_delivery = self.jeddah_delivery_fees.get(
            zone_key,
            max(self.min_delivery_fee, distance_km * self.delivery_rate_per_km)
        )
        if is_rush_hour:
            base_delivery *= (1 + self.rush_hour_surcharge)
        if urgency == "urgent":
            base_delivery *= (1 + self.urgent_surcharge)
        elif urgency == "emergency":
            base_delivery *= (1 + self.emergency_surcharge)
        total_delivery_fee = round(base_delivery, 2)
        platform_shipping_fee_cut = round(total_delivery_fee * self.platform_shipping_cut, 2)
        captain_net_payout = round(total_delivery