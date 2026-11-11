# Projects Pagina Documentatie

Deze documentatie beschrijft de implementatie van de projects pagina die communiceert met je backend API.

## 📋 Overzicht

De projects pagina haalt dynamisch projecten op van je backend API en toont deze in een mooie grid layout met paginatie.

### API Response Format
De backend API moet data teruggeven in dit formaat:
```json
{
  "docs": [
    {
      "createdAt": "2025-09-26T16:15:57.947Z",
      "updatedAt": "2025-09-26T16:15:57.947Z", 
      "naam": "Project Naam",
      "id": "68d6bc3d0e83cdbb1afab8da",
      "beschrijving": "Beschrijving van het project (optioneel)",
      "technologieen": ["React", "Node.js"], 
      "url": "https://example.com",
      "afbeelding": "https://example.com/image.jpg"
    }
  ],
  "totalDocs": 1,
  "limit": 10, 
  "totalPages": 1,
  "page": 1,
  "pagingCounter": 1,
  "hasPrevPage": false,
  "hasNextPage": false,
  "prevPage": null,
  "nextPage": null
}
```

## 🚀 Functionaliteiten

### ✅ Geïmplementeerd
- ✅ Projecten ophalen van backend API
- ✅ Responsive grid layout voor projecten
- ✅ Paginatie met vorige/volgende knoppen
- ✅ Project detail pagina's
- ✅ Error handling en loading states
- ✅ TypeScript typering voor alle componenten
- ✅ SEO-vriendelijke meta tags
- ✅ Mobile responsive design

### 📱 Pagina's
1. **`/projects`** - Overzichtspagina met alle projecten
2. **`/projects/[id]`** - Detail pagina voor individuele projecten

## 🛠️ Technische Implementatie

### Bestanden Structuur
```
src/
├── lib/
│   ├── api.ts                    # API functies
│   ├── types.ts                  # TypeScript interfaces
│   ├── index.ts                  # Exports
│   └── components/
│       ├── ErrorMessage.svelte   # Error component
│       └── LoadingSpinner.svelte # Loading component
└── routes/
    └── projects/
        ├── +page.svelte          # Projects overzicht
        ├── +page.ts             # Load functie voor data
        └── [slug]/
            ├── +page.svelte      # Project detail
            └── +page.ts         # Load functie voor detail
```

### API Configuratie
De API basis URL is configureerbaar via environment variabelen:

1. **Kopieer `.env.example` naar `.env`:**
   ```bash
   cp .env.example .env
   ```

2. **Pas de API URL aan in `.env`:**
   ```env
   API_BASE_URL=http://localhost:5005/api
   ```

### Error Handling
- **Network errors**: Automatische retry optie
- **404 errors**: "Project niet gevonden" pagina
- **500+ errors**: "Service niet beschikbaar" melding
- **Client errors**: Specifieke foutmeldingen

### Paginatie
- URL parameters: `?page=2&limit=20`
- Standaard: 10 projecten per pagina
- Navigatie: Eerste, Vorige, Volgende, Laatste

## 🎨 Styling

De pagina gebruikt moderne CSS met:
- **CSS Grid** voor responsive layout
- **Flexbox** voor component layouts  
- **CSS Custom Properties** voor consistente kleuren
- **Smooth transitions** en hover effecten
- **Mobile-first** responsive design

### Kleuren Schema
- Primaire kleur: `#007acc` (blauw)
- Hover kleur: `#005fa3` (donker blauw)
- Text kleur: `#333` (donker grijs)
- Border kleur: `#eee` (licht grijs)

## 🔧 Gebruik

### Backend Requirements
Je backend API moet de volgende endpoints hebben:

1. **GET `/api/projects`**
   - Query parameters: `page`, `limit`
   - Returns: Gepagineerde lijst van projecten

2. **GET `/api/projects/:id`** 
   - Returns: Enkel project object

### Vereiste Project Velden
- `id` (string, required)
- `naam` (string, required)  
- `createdAt` (ISO string, required)
- `updatedAt` (ISO string, required)
- `beschrijving` (string, optional)
- `technologieen` (string[], optional)
- `url` (string, optional)
- `afbeelding` (string, optional)

## 🚀 Development

```bash
# Start development server
npm run dev

# Type checking
npm run check

# Build for production  
npm run build
```

De applicatie draait standaard op `http://localhost:3000/projects`

## 🔍 Troubleshooting

### Veelvoorkomende Problemen

1. **"Failed to fetch projects"**
   - Controleer of je backend service draait
   - Verificeer de API_BASE_URL in je .env bestand
   - Check CORS instellingen van je backend

2. **"Project not found" op detail pagina**
   - Controleer of het project ID geldig is
   - Verificeer de backend route voor `/api/projects/:id`

3. **Paginatie werkt niet**
   - Controleer query parameter handling in backend
   - Verificeer dat `totalPages`, `hasNextPage` etc. correct teruggegeven worden

### API Testing
Test je API endpoints met curl:

```bash
# Test projects lijst
curl "http://localhost:5005/api/projects?page=1&limit=10"

# Test specifiek project  
curl "http://localhost:5005/api/projects/[PROJECT_ID]"
```

## 💡 Uitbreidingsmogelijkheden

- **Zoek functionaliteit** in projecten
- **Filter op technologieën**
- **Sortering opties**
- **Infinite scroll** in plaats van paginatie
- **Project categoriëen**
- **Favorieten systeem**

---

Gemaakt voor een moderne, professionele portfolio website! 🎉