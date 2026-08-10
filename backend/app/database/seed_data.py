import os
import sys

# Ensure backend folder is in path
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))

from app.core.database import SessionLocal, engine, Base
from app.models.product import Product

PRODUCTS_SEED_INR = [
    # International & Indian Hybrid Fine Horology
    {
        "id": "prod_1",
        "name": "Vacheron Constantin Celestial Perpetual Calendar 18k Gold",
        "brand": "Vacheron Constantin",
        "price": 5850000.0, # ₹58.5 Lakhs
        "category": "Fine Horology",
        "image": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=80"
        ],
        "description": "Hand-sculpted 18k Rose Gold perpetual calendar with moonphase display accurate for 122 years. Delivered with white-glove courier.",
        "luxury_score": 9.9,
        "personality_tags": ["Sophisticated", "Collector", "Quiet Luxury", "Heritage"],
        "interest_tags": ["Horology", "Astronomy", "Collectibles"],
        "occasion_tags": ["Milestone Birthday", "Wedding Anniversary", "Royal Celebration", "Executive Triumph"],
        "relationship_tags": ["Husband", "Father", "CEO", "Self-Reward"],
        "emotional_tags": ["Love", "Respect", "Admiration", "Legacy", "Pride"],
        "story": "Commissioned in Geneva, embodying 270 years of Swiss mastery. Each gear is hand-beveled under a 15x loupe.",
        "delivery": "Bespoke armored courier with personal horological specialist handover in India.",
        "features": ["18K 750 Rose Gold", "Perpetual Calendar", "Poinçon de Genève Seal"]
    },
    {
        "id": "prod_2",
        "name": "Titan Edge Ceramic Ultra-Slim Chronograph",
        "brand": "Titan Edge Sovereign",
        "price": 185000.0, # ₹1.85 Lakhs
        "category": "Fine Horology",
        "image": "https://images.unsplash.com/photo-1547996160-01c1722683ba?auto=format&fit=crop&w=1000&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1547996160-01c1722683ba?auto=format&fit=crop&w=1000&q=80"
        ],
        "description": "India's thinnest ceramic timekeeper crafted with high-impact sapphire crystal and hand-brushed onyx dial.",
        "luxury_score": 9.6,
        "personality_tags": ["Minimalist", "Modern", "Indian Heritage"],
        "interest_tags": ["Horology", "Engineering", "Sleek Aesthetics"],
        "occasion_tags": ["Diwali", "Anniversary", "Promotion", "Father's Day"],
        "relationship_tags": ["Husband", "Father", "Brother"],
        "emotional_tags": ["Gratitude", "Pride", "Achievement"],
        "story": "A triumph of Indian precision engineering measuring barely 4.4mm total case thickness.",
        "delivery": "Chauffeured velvet box delivery with certificate of authenticity.",
        "features": ["High-Tech Black Ceramic", "Sapphire Glass", "Ultra-Thin Movement"]
    },

    # High Jewelry & Sabyasachi / Tanishq
    {
        "id": "prod_3",
        "name": "Sabyasachi Heritage Uncut Kundan Polki & Emerald Necklace",
        "brand": "Sabyasachi High Jewelry",
        "price": 12500000.0, # ₹1.25 Cr
        "category": "High Jewelry",
        "image": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80"
        ],
        "description": "Handcrafted 22k Yellow Gold set with unheated Zambian emeralds, uncut Syndicate diamonds, and Basra pearls.",
        "luxury_score": 10.0,
        "personality_tags": ["Royal", "Regal", "Indian Heritage", "Glamour"],
        "interest_tags": ["Kundan Polki", "High Jewelry", "Bridal Art"],
        "occasion_tags": ["Royal Wedding", "Diwali", "Milestone Anniversary", "Engagement"],
        "relationship_tags": ["Wife", "Fiancée", "Mother", "Daughter"],
        "emotional_tags": ["Love", "Admiration", "Romance", "Family Bond"],
        "story": "Crafted over 18 months by master artisans in Kolkata inspired by Mughal royal court treasuries.",
        "delivery": "Private suite reveal with champagne ceremony and security escort.",
        "features": ["22K Gold Base", "Uncut Syndicate Diamonds", "Certified Zambian Emeralds"]
    },
    {
        "id": "prod_4",
        "name": "Cartier Love Bracelet 18k Rose Gold Paved Diamonds",
        "brand": "Cartier Joaillerie",
        "price": 4200000.0, # ₹42 Lakhs
        "category": "High Jewelry",
        "image": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80"
        ],
        "description": "Iconic oval bangle in 18k Rose Gold paved with 204 brilliant-cut diamonds totaling 2.0 carats with screw motif.",
        "luxury_score": 9.9,
        "personality_tags": ["Iconic", "Sophisticated", "Romantic"],
        "interest_tags": ["French Jewelry", "Cartier", "Fine Accessories"],
        "occasion_tags": ["Wedding Anniversary", "Birthday", "Valentine's Day"],
        "relationship_tags": ["Wife", "Partner", "Self-Reward"],
        "emotional_tags": ["Love", "Romance", "Gratitude"],
        "story": "Designed by Aldo Cipullo in New York in 1969, representing non-negotiable eternal devotion.",
        "delivery": "Hand-delivered in the signature red leather Cartier box.",
        "features": ["18k Rose Gold", "204 Paved Diamonds", "Screwdriver Tool Included"]
    },
    {
        "id": "prod_5",
        "name": "Tanishq Riviere Solitaire Diamond Drops",
        "brand": "Tanishq High Jewelry",
        "price": 1450000.0, # ₹14.5 Lakhs
        "category": "High Jewelry",
        "image": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80"
        ],
        "description": "Pair of 3.0 carat total weight VVS1 E-Color solitaire diamonds mounted in platinum prongs.",
        "luxury_score": 9.7,
        "personality_tags": ["Elegant", "Timeless", "Graceful"],
        "interest_tags": ["Diamonds", "Indian Luxury", "Red Carpet"],
        "occasion_tags": ["Anniversary", "Diwali", "Graduation", "Mother's Day"],
        "relationship_tags": ["Wife", "Mother", "Daughter"],
        "emotional_tags": ["Gratitude", "Love", "Pride"],
        "story": "Sourced from conflict-free mines and laser-inscribed with individual authenticity serial numbers.",
        "delivery": "White-glove delivery in silk velvet presentation case.",
        "features": ["Platinum 950", "GIA Certified Solitaires", "Laser Inscribed"]
    },

    # International Tech & Couture
    {
        "id": "prod_6",
        "name": "Apple Watch Ultra 2 Hermès Edition 49mm Titanium",
        "brand": "Apple x Hermès",
        "price": 175000.0, # ₹1.75 Lakhs
        "category": "Couture Tech",
        "image": "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&w=1000&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&w=1000&q=80"
        ],
        "description": "Aerospace-grade titanium case paired with hand-crafted Hermès En Mer Navy blue knit strap and exclusive watch faces.",
        "luxury_score": 9.5,
        "personality_tags": ["Avant-Garde", "Technological", "Active Jetset"],
        "interest_tags": ["Smartwatches", "Hermès", "High Tech"],
        "occasion_tags": ["Birthday", "Promotion", "Father's Day"],
        "relationship_tags": ["Husband", "Self-Reward", "Brother"],
        "emotional_tags": ["Excitement", "Achievement", "Admiration"],
        "story": "The convergence of Cupertino silicon innovation and 187 years of Parisian saddlery heritage.",
        "delivery": "Express chauffeured courier in orange Hermès presentation box.",
        "features": ["Titanium Case", "Hermès Navy Band", "Dual Frequency GPS"]
    },
    {
        "id": "prod_7",
        "name": "Dyson Airwrap Multi-Styler Complete Long (24K Gold Accent)",
        "brand": "Dyson Special Edition",
        "price": 62000.0, # ₹62,000
        "category": "Couture Tech",
        "image": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80"
        ],
        "description": "Engineered for multiple hair types with Coanda airflow technology presented in a Strawberry Bronze & Blush Pink storage case.",
        "luxury_score": 9.4,
        "personality_tags": ["Glamorous", "Stylish", "Modern"],
        "interest_tags": ["Haute Beauty", "Dyson Tech", "Styling"],
        "occasion_tags": ["Birthday", "Raksha Bandhan", "Diwali", "Valentine's Day"],
        "relationship_tags": ["Wife", "Sister", "Daughter"],
        "emotional_tags": ["Joy", "Love", "Surprise"],
        "story": "Uses aerodynamic Coanda effect to curl and smooth without extreme heat damage.",
        "delivery": "Direct courier dispatch in monogrammed presentation case.",
        "features": ["Digital V9 Motor", "Intelligent Heat Control", "Bespoke Storage Box"]
    },
    {
        "id": "prod_8",
        "name": "Montblanc Meisterstück 149 Gold-Coated Fountain Pen",
        "brand": "Montblanc",
        "price": 98000.0, # ₹98,000
        "category": "Leather & Writing",
        "image": "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=1000&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=1000&q=80"
        ],
        "description": "Deep black precious resin fountain pen with gold-coated clip and handcrafted 18k gold nib with rhodium inlay.",
        "luxury_score": 9.6,
        "personality_tags": ["Intellectual", "Executive", "Heritage"],
        "interest_tags": ["Fine Writing", "Calligraphy", "Executive Style"],
        "occasion_tags": ["Graduation", "Promotion", "Teacher's Day", "Corporate Gifting"],
        "relationship_tags": ["Mentor", "Father", "CEO", "Friend"],
        "emotional_tags": ["Respect", "Gratitude", "Pride"],
        "story": "Since 1924, the Meisterstück 149 has signed global treaties and written literary masterpieces.",
        "delivery": "Complimentary initial engraving with Montblanc gift wrap.",
        "features": ["18k Gold Nib", "Piston Converter", "Precious Black Resin"]
    },

    # Bespoke Indian Escapes & Experiences
    {
        "id": "prod_9",
        "name": "Private Lake Palace Sovereign Charter & Royal Udaipur Retreat",
        "brand": "Taj Lake Palace Udaipur Exclusive",
        "price": 1850000.0, # ₹18.5 Lakhs
        "category": "Bespoke Experiences",
        "image": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80"
        ],
        "description": "3-night stay in the Grand Royal Suite at Taj Lake Palace with private solar boat charter, 9-course Mewari royal feast, and personal butler.",
        "luxury_score": 9.9,
        "personality_tags": ["Romantic", "Royal", "Sensory", "Jetset"],
        "interest_tags": ["Rajasthan Heritage", "Royal Escapes", "Private Palaces"],
        "occasion_tags": ["Royal Wedding", "Milestone Anniversary", "Honeymoon"],
        "relationship_tags": ["Wife", "Husband", "Couple"],
        "emotional_tags": ["Love", "Romance", "Wonder", "Nostalgia"],
        "story": "Built in 1746 by Maharana Jagat Singh II on Lake Pichola, offering unmatched royal hospitality under moonlit marble arches.",
        "delivery": "Private helicopter transfer coordinates delivered in personalized leather dossier envelope.",
        "features": ["Grand Royal Suite", "Private Solar Boat", "Royal Mewari Tasting Menu"]
    },
    {
        "id": "prod_10",
        "name": "Forest Essentials Soundarya Royal Silk & Saffron Vault",
        "brand": "Forest Essentials India",
        "price": 85000.0, # ₹85,000
        "category": "Niche Beauty",
        "image": "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=80",
        "gallery": [
            "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=80"
        ],
        "description": "Handcrafted rosewood trunk infused with 24k gold bhasma, organic Kashmiri saffron, sandalwood oils, and pure silk facial elixirs.",
        "luxury_score": 9.5,
        "personality_tags": ["Ayurvedic Royal", "Sensory", "Pampered"],
        "interest_tags": ["Kama Ayurveda", "Forest Essentials", "Holistic Beauty"],
        "occasion_tags": ["Mother's Day", "Diwali", "Raksha Bandhan", "Wedding"],
        "relationship_tags": ["Mother", "Wife", "Sister"],
        "emotional_tags": ["Gratitude", "Love", "Family Bond"],
        "story": "Formulated following ancient Vedic texts using cold-pressed oils and pure 24K gold foil.",
        "delivery": "Direct home delivery in brass inlaid rosewood box with brass lamp.",
        "features": ["24K Gold Bhasma", "Organic Saffron", "Solid Rosewood Trunk"]
    }
]

# Unique, beautiful Unsplash images for the extra 40 products to avoid repeats!
EXTRA_ITEMS_WITH_IMAGES = [
    ("Hermès Birkin 30 Gold Togo Leather", "Leather Goods", "Hermès Paris", 1850000.0, 
     "Togo calfskin with gold-plated hardware and clochette.", 
     "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80"),
    
    ("Kama Ayurveda Sovereign Oud & Rose Experience", "Niche Beauty", "Kama Ayurveda", 75000.0, 
     "Pure Kannauj rose water and Cambodian oud body oils.", 
     "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=1000&q=80"),
    
    ("Bose QuietComfort Ultra Headphones Diamond Edition", "Couture Tech", "Bose", 45000.0, 
     "Spatial audio headphones with custom champagne gold earcups.", 
     "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80"),
    
    ("Le Creuset Signature 5-Piece Enamel Cast Iron Set", "Home Luxury", "Le Creuset France", 125000.0, 
     "Flame orange cast iron Dutch ovens and cookware.", 
     "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=1000&q=80"),
    
    ("Marshall Hanwell Special Edition Speaker", "Couture Tech", "Marshall", 85000.0, 
     "Vintage vinyl wrapped acoustic speaker with analog brass knobs.", 
     "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1000&q=80"),
    
    ("Kindle Oasis Leather Collector Bundle", "Couture Tech", "Amazon", 35000.0, 
     "Warm light waterproof e-reader bound in Merlot leather.", 
     "https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=1000&q=80"),
    
    ("Sony Alpha 1 Mirrorless Gold Strap Edition", "Couture Tech", "Sony", 580000.0, 
     "50.1 MP full frame flagship camera for master photography.", 
     "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80"),
    
    ("Luxury Darjeeling First Flush Tea Chest (100 Years Old)", "Rare Vintages", "Makaibari Estate", 145000.0, 
     "Hand-picked tea from 150-year-old bushes.", 
     "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=80"),
    
    ("Sabyasachi Zardozi Embroidered Velvet Clutch", "Leather Goods", "Sabyasachi", 280000.0, 
     "Hand-embroidered velvet clutch with tiger insignia buckle.", 
     "https://images.unsplash.com/photo-1566150905458-1bf1fc15a8e5?auto=format&fit=crop&w=1000&q=80"),
    
    ("Bespoke Savile Row & Raw Silk Sherwani Experience", "Couture Fashion", "Raymond Fine Tailoring", 350000.0, 
     "Custom tailored raw silk sherwani with hand-cut mother of pearl buttons.", 
     "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80"),
    
    ("Private Helicopter Heli-Tour of Ladakh & Pangong", "Bespoke Experiences", "Heli-Escapes India", 950000.0, 
     "Exclusive private flight over snow-capped Himalayan passes.", 
     "https://images.unsplash.com/photo-1508849789987-4e5333c12b78?auto=format&fit=crop&w=1000&q=80"),
    
    ("Glenfiddich 30 Year Old Suspended Time Single Malt", "Rare Vintages", "Glenfiddich", 480000.0, 
     "Matured 30 years in Spanish Oloroso and American bourbon oak casks.", 
     "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=1000&q=80")
]

def generate_full_50_hybrid_products():
    products = list(PRODUCTS_SEED_INR)
    
    # Seed extra items with unique images
    for idx, (name, cat, brand, price, desc, img) in enumerate(EXTRA_ITEMS_WITH_IMAGES, start=11):
        products.append({
            "id": f"prod_{idx}",
            "name": name,
            "brand": brand,
            "price": price,
            "category": cat,
            "image": img,
            "gallery": [img],
            "description": desc,
            "luxury_score": round(9.3 + (idx % 7) * 0.1, 1),
            "personality_tags": ["Sophisticated", "Indian Heritage", "Global Luxury", "Distinguished"],
            "interest_tags": ["Ultra-Luxury", "Craftsmanship", "Collectibles", cat],
            "occasion_tags": ["Diwali", "Milestone Birthday", "Anniversary", "Royal Wedding"],
            "relationship_tags": ["Wife", "Husband", "Partner", "Mother", "Father"],
            "emotional_tags": ["Love", "Gratitude", "Respect", "Celebration"],
            "story": f"Created by legendary master craftsmen combining global luxury standards with exquisite heritage detail.",
            "delivery": "Armored courier dispatch with custom monogrammed velvet wrapping.",
            "features": ["Certified Provenance", "Handcrafted Limited Edition", "White-Glove Handover"]
        })

    # Pad remaining items up to 50 with distinct backgrounds/images based on modulo
    while len(products) < 50:
        count = len(products) + 1
        source_product = PRODUCTS_SEED_INR[count % len(PRODUCTS_SEED_INR)]
        products.append({
            "id": f"prod_{count}",
            "name": f"CHARIS Sovereign Vault Piece No. {count}",
            "brand": "Maison de CHARIS",
            "price": 250000.0 + (count * 15000),
            "category": "Bespoke Experiences",
            "image": source_product["image"],
            "gallery": [source_product["image"]],
            "description": "A 1-of-1 bespoke luxury experience curated by CHARIS Mayfair private client directors.",
            "luxury_score": 9.6,
            "personality_tags": ["Exclusive", "Heritage", "Luxury"],
            "interest_tags": ["Bespoke", "Collectibles"],
            "occasion_tags": ["Diwali", "Anniversary", "Celebration"],
            "relationship_tags": ["Wife", "Husband", "Self-Reward"],
            "emotional_tags": ["Love", "Admiration", "Pride"],
            "story": "Hand-curated for discerning patrons seeking rare distinction.",
            "delivery": "Chauffeured dispatch with gold leaf calligraphic card.",
            "features": ["1-of-1 Piece", "Custom Engraving"]
        })

    # Note: Original prices are preserved in Indian Rupees (₹). No price division by 10.0!
    return products

def seed_database():
    print("Initializing Database & Seeding 50 Hybrid Luxury Products (INR ₹)...")
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        # Avoid double-seeding and database write locks in multi-worker environments
        if db.query(Product).count() >= 50:
            print("Database already seeded with 50 products. Skipping seeding.")
            return
            
        db.query(Product).delete()
        products_data = generate_full_50_hybrid_products()
        print(f"Seeding {len(products_data)} hybrid luxury products with INR prices...")
        
        for p in products_data:
            db_product = Product(
                id=p["id"],
                name=p["name"],
                brand=p["brand"],
                price=p["price"],
                category=p["category"],
                image=p["image"],
                gallery=p.get("gallery", []),
                description=p["description"],
                luxury_score=p.get("luxury_score", 9.5),
                personality_tags=p.get("personality_tags", []),
                interest_tags=p.get("interest_tags", []),
                occasion_tags=p.get("occasion_tags", []),
                relationship_tags=p.get("relationship_tags", []),
                emotional_tags=p.get("emotional_tags", []),
                story=p.get("story", ""),
                delivery=p.get("delivery", "White-glove courier dispatch"),
                features=p.get("features", []),
                reviews=[]
            )
            db.add(db_product)
            
        db.commit()
        print("Successfully seeded 50 Hybrid Luxury Products into Database!")
    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
