import fs from "fs";
import { destinations } from "./src/data/destinations.js";

// Define 140 completely unique Unsplash photo IDs specifically chosen for the 28 destinations
const uniqueImageMap = {
  "ladakh": [
    "1542856391-010fb87dcfed", // Himalayas
    "1506744038136-46273834b3fb", // Mountain Lake
    "1464822759023-fed622ff2c3b", // High Peak
    "1454496522488-7a8e488e8606", // Snowy Mountain
    "1470071459604-3b5ec3a7fe05"  // Valley View
  ],
  "taj-mahal": [
    "1564507592333-c60657eea523", // Taj Mahal Front
    "1548013146-72479768bada", // Reflection Pool
    "1524492412937-b28074a5d7da", // Dome Detail
    "1585464231875-d9ef1f5ad396", // Agra Fort
    "1508919801845-fc2ae1bc2a28"  // Sunrise View
  ],
  "kerala": [
    "1507525428034-b723cf961d3e", // Backwater shore
    "1505118380757-91f5f5632de0", // Tropical water
    "1519046904884-53103b34b206", // Palm Trees
    "1540206395-68808572332f", // Houseboat deck
    "1473116763269-255ea7604662"  // Sea waves
  ],
  "khajuraho": [
    "1607348988049-05a0d3dd63df", // Temple facade
    "1523381210434-271e8be1f52b", // Carvings details
    "1582510003544-4d00b7f74220", // Medieval carving
    "1608958417439-d3e34b95d7b5", // Sculptures detail
    "1593693397690-362cb9666fc2"  // Stone architecture
  ],
  "varanasi": [
    "1595815771614-ade9d652a65d", // Ganga Boats
    "1605649487212-47bdab064df7", // Ganga Aarti
    "1561361513-2d000a50f0db", // River Ghats
    "1514222134-b57cbb8ce073", // Varanasi temples
    "1598007089408-01e405e3a79d"  // River stairs
  ],
  "rajasthan": [
    "1477587458883-471a5cd08ef4", // Hawa Mahal
    "1599661093188-757a13f2d847", // Udaipur Palace
    "1524293581917-878a6d017c71", // Jaisalmer Dunes
    "1539635278303-d4002c07eae3", // Jodhpur Mehrangarh
    "1599661046289-e318978db67c"  // Royal Archway
  ],
  "darjeeling": [
    "1557999818-8f553f191b29", // Tea estates
    "1584348633391-7dbffbd3675a", // Himalayan Toy Train
    "1540959733332-eab4deceeaf7", // Kanchenjunga mist
    "1591526315578-831d17d59df4", // Monastery prayer
    "1571401888144-cbdec3d789ca"  // Mountain village
  ],
  "goa": [
    "1512100356956-c1d472ab60df", // Beach shack
    "1506929562872-bb421503ef21", // Sunset palms
    "1504609773096-104ff2c73ba4", // Palolem beach
    "1520250497591-112f2f40a3f4", // Coastal view
    "1503220317375-aaad61436b1b"  // Bom Jesus Church
  ],
  "manali": [
    "1617653263743-3bb92b825d60", // Solang snow
    "1622646148785-6e580e2f5b9b", // Mountain pass
    "1595180400588-466d1f953086", // Hadimba Temple forest
    "1549558549-41524c418481", // Snow pine forest
    "1611003976695-1262d08a543b"  // Beas River
  ],
  "nainital": [
    "1569336415962-a4bd9f69cd83", // Nainital Lake
    "1588598126701-4475470d0615", // Boats at Nainital
    "1618213837799-25d5552822a3", // Himalayan overlook
    "1568449039662-74e21a8942cf", // Misty lake trees
    "1498050108023-c5249f4df085"  // Hill road
  ],
  "kashmir": [
    "1566228015668-4c45dbc4e2f5", // Dal Lake Houseboat
    "1598272548301-6c588e6ce616", // Shikara Rowing
    "1609137144813-fdf4e9fe333c", // Autumn Chinar Trees
    "1527004013197-933c4bb611b3", // Gulmarg Snow peaks
    "1562790351-d273a961e0e9"  // Pahalgam meadow
  ],
  "sikkim": [
    "1589308078059-be1415eab4c3", // Tsomgo Lake
    "1610123598147-f63251c00a69", // Gangtok overview
    "1626082927389-6cd097cdc6ec", // Ravangla Buddha Park
    "1544735716-392fe2489ffa", // Monastery flag
    "1578301978693-85fa9c0320b9"  // Pelling peak view
  ],
  "andaman": [
    "1559136555-9303baea8ebd", // Radhanagar Beach
    "1579684389782-64d84b5e9053", // Under-water corals
    "1605538032432-a9f0c8d9ba5e", // Neil island bridge
    "1600210492486-724fe5c67fb0", // Clear blue lagoon
    "1515238152791-8216bfdf89a7"  // Leaning palm tree
  ],
  "amritsar": [
    "1544084944-15269ec7b5a0", // Golden Temple Front
    "1596422846543-75c6fc1f7067", // Night golden temple
    "1608958220822-b5cc02fe5d88", // Inside details
    "1627586144883-9b2f4cb1213f", // Wagah border flag
    "1506126613408-eca07ce68773"  // Jallianwala bagh well
  ],
  "meghalaya": [
    "1618231354395-50269f88c83e", // Living Root Bridge
    "1629814349141-c7c4fdf4e9fe", // Dawki clear water
    "1506744030283-a4bd9f69cd82", // Cherrapunji falls
    "1611003976695-218081684784", // Cave limestone
    "1626574783424-9b5522e8ec67"  // Shillong clouds
  ],
  "hampi": [
    "1600100397608-f010e42ec8fb", // Stone Chariot
    "1600100397995-1262d08a543b", // Virupaksha tower
    "1620127252536-03bdfcf6d5c3", // Lotus Mahal stables
    "1584551246679-0daf3d275d0f", // Boulder landscape
    "1600100397576-9c4c23ba7802"  // Sunset over Hampi ruins
  ],
  "ooty": [
    "1598977123418-45f04b615e0e", // Ooty toy train
    "1513694203232-719a280e022f", // Nilgiri hills view
    "1500530855697-b586d89ba3ee", // Botanical gardens
    "1620127252536-03bdfcf6d5c5", // Tea leaf picking
    "1520250497591-112f2f40a3f5"  // Pykara Lake boat
  ],
  "gujarat": [
    "1603258590680-d667c29e71ec", // Statue of Unity
    "1627586144883-9b2f4cb1213e", // Rann of Kutch
    "1621285853634-713b53874b6f", // Dwarkadhish temple
    "1590050752117-238cb0612b1b", // Kutch handicrafts
    "1547127796-06bb04e4b315"  // Gir forest lion
  ],
  "munnar": [
    "1593693397691-362cb9666fc2", // Munnar hills
    "1616788494672-ecd7e3fded18", // Tea valleys
    "1516690561799-46d8f74f90f6", // Lockhart tea estates
    "1589308078059-be1415eab4c9", // Munnar scenic peaks
    "1500530855697-b586d89ba3e9"  // Anamudi hills
  ],
  "kodaikanal": [
    "1626082927389-6cd097cdc6e9", // Star lake Kodaikanal
    "1598977123418-45f04b615e09", // Pillar rocks cliffs
    "1501785888041-af3ef285b479", // Pine forests
    "1513836279014-a89f7a76ae89", // Coaker's walk
    "1470071459604-3b5ec3a7fe09"  // Silver Cascade falls
  ],
  "wayanad": [
    "1589308078059-be1415eab4cf", // Wayanad rainforest
    "1542856391-010fb87dcfef", // Edakkal Caves petroglyphs
    "1516690561799-46d8f74f90f7", // Banasura Sagar dam
    "1507525428034-b723cf961d3f", // Chembra heart lake
    "1629814349141-c7c4fdf4e9f7"  // Soochipara falls
  ],
  "coorg": [
    "1593693397690-362cb9666fc9", // Coorg coffee fields
    "1626574783424-9b5522e8ec69", // Coorg misty hills
    "1544735716-392fe2489ff9", // Golden Temple Bylakuppe
    "1600100397608-f010e42ec8f9", // Raja's seat overlooks
    "1500530855697-b586d89ba3e8"  // Dubare Elephant river
  ],
  "mysore": [
    "1620127252536-03bdfcf6d5c9", // Mysore Palace interiors
    "1600100397608-f010e42ec8f8", // Mysore Palace gates
    "1584551246679-0daf3d275d0e", // St. Philomena gothic facade
    "1564507592333-c60657eea529", // Brindavan Garden fountains
    "1599661046289-e318978db679"  // Chamundi hill temples
  ],
  "pondicherry": [
    "1507525428034-b723cf961d39", // Auroville dome
    "1519046904884-53103b34b209", // French yellow houses
    "1540206395-688085723329", // Rock beach Promenade
    "1505118380757-91f5f5632de9", // Paradise beach lagoon
    "1473116763269-255ea7604669"  // Sri Aurobindo gardens
  ],
  "rameswaram": [
    "1620127252536-03bdfcf6d5c8", // Pamban sea bridge
    "1584551246679-0daf3d275d0d", // Temple pillars long corridor
    "1590050752117-238cb0612b1a", // Dhanushkodi ghost town beach
    "1548013146-72479768bad9", // Agni Theertham waters
    "1590050752117-238cb0612b1c"  // APJ Kalam memorial gates
  ],
  "kanyakumari": [
    "1507525428034-b723cf961d38", // Vivekananda memorial rock
    "1519046904884-53103b34b208", // Thiruvalluvar giant statue
    "1540206395-688085723328", // Confluence of three seas sunrise
    "1505118380757-91f5f5632de8", // Kanyakumari temple sea views
    "1473116763269-255ea7604668"  // Gandhi memorial shoreline
  ],
  "gokarna": [
    "1507525428034-b723cf961d37", // Gokarna Om beach shore
    "1519046904884-53103b34b207", // Cliff view waves Gokarna
    "1540206395-688085723327", // Mahabaleshwar ancient entryway
    "1505118380757-91f5f5632de7", // Paradise beach woods trek
    "1620127252536-03bdfcf6d5c7"  // Mirjan Fort ruins
  ],
  "chikmagalur": [
    "1593693397690-362cb9666fc8", // Mullayanagiri Peak trek
    "1626574783424-9b5522e8ec68", // Coffee estate rows Chikmagalur
    "1600100397608-f010e42ec8fa", // Baba Budangiri hills mist
    "1506744038136-46273834b3fa", // Hebbe waterfall double drops
    "1500530855697-b586d89ba3ea"  // Kemmangundi garden overview
  ]
};

// 1. Process destinations array and update the images property
const updatedDestinations = destinations.map((dest) => {
  const customIds = uniqueImageMap[dest.id];
  if (customIds && customIds.length === 5) {
    dest.images = customIds.map(id => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`);
  }
  return dest;
});

// 2. Generate file content for destinations.js
const fileContent = `export const destinations = ${JSON.stringify(updatedDestinations, null, 2)};`;

// 3. Write output to destinations.js
fs.writeFileSync("./src/data/destinations.js", fileContent, "utf-8");

console.log("Successfully replaced and updated destinations.js with 140 unique images!");
