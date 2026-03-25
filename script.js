let bag = [];
let carlMessage = "";
const totalTreasures = 5;
let itemReviewIndex = 0;

const yanaLetter = "Dear Carl,\n\nMy only wish is to be by your side for every sunset yet to come. These 5 months have been my favorite story. I love you more than the ocean is deep.\n\nForever yours,\nYana";

// metaphors
const reviewMetaphors = {
    "Sea Glass": { icon: "💎", yana: "\"This glass was once sharp and broken, but the ocean turned it into something smooth and beautiful. Just like how we grow through the rough waves, Carl.\"", carl: "\"It reminds me that time makes us stronger together.\"" },
    "Shining Pearl": { icon: "🫧", yana: "\"Pearls grow in secret, hidden away until they're ready to shine. Our love felt like that at first—a little secret only we knew.\"", carl: "\"And now it's the brightest thing in my life.\"" },
    "Spiral Shell": { icon: "🐚", yana: "\"Look at the rings, sayang. They never end, they just keep growing outward. Five months is just the first few spirals of our life.\"", carl: "\"I want to count a hundred more rings with you.\"" },
    "Heart Wood": { icon: "🪵", yana: "\"The trees gave this up, and the waves brought it right to our feet. It’s like destiny wanted us to find a heart today.\"", carl: "\"It’s a sign that we’re exactly where we’re supposed to be.\"" },
    "Glass Bottle": { icon: "🍾", yana: "\"It's empty now, but it’s waiting for our words. It’s a vessel for everything we haven't said yet.\"", carl: "\"Let's fill it with promises that will never break.\"" }
};

const story = {
    start: {
        speaker: "",
        text: "The waves are whispering secrets to the shore. I glance at Yana. She's humming that song she loves, her eyes fixed on the horizon. It feels like the world has stopped just for us.",
        choices: [
            { text: "Touch her hand gently", next: "intro_1", reply: "I reach out and brush my fingers against hers. She immediately laces her fingers with mine, leaning her head on my shoulder. \"It's a perfect day, isn't it?\" she whispers." },
            { text: "Tell her she sounds beautiful", next: "intro_1", reply: "I tell her how much I love her humming. She blushes slightly, giving my hand a playful squeeze. \"You always say the sweetest things, sayang.\"" }
        ]
    },
    intro_1: {
        speaker: "Yana",
        text: "She points toward the shoreline as the tide pulls back. \"Sayang, look at the tide... it's bringing in so many treasures. Why don't we collect some before the sun sets?\"",
        choices: [
            { text: "\"Sure, I'd walk anywhere with you.\"", next: "explore_hub", reply: "She laughs softly and pulls me toward the water. \"Then let's not waste a single second, sayang!\"" },
            { text: "\"Let's see who can find the best one.\"", next: "explore_hub", reply: "She smirks playfully, brushing a strand of hair behind her ear. \"Oh, you're on! But I'm an expert at spotting sparkles!\"" }
        ]
    },
    explore_hub: {
        speaker: "",
        text: "The beach stretches out before me, the sand still warm under my feet. Where should I lead the way?",
        choices: [
            { text: "The Shimmering Tide Pools", next: "pool_investigate" },
            { text: "The High Sandy Dunes", next: "dune_investigate" },
            { text: "The Old Driftwood Pile", next: "driftwood_investigate" }
        ]
    },
    pool_investigate: {
        speaker: "",
        text: "The water in the pools is crystal clear. I notice some thick seaweed swaying near the rocks and catch a glimpse of something blue.",
        choices: [
            { text: "Reach into the pool", next: "pool_choice_2", reply: "I reach into the cool water, moving the seaweed aside. A smooth, blue fragment reflects the light." },
            { text: "Ask Yana to help look", next: "pool_choice_yana", reply: "She kneels beside me, her eyes scanning the rocks. \"Wait, Carl! There's something tiny and white over here...\"" }
        ]
    },
    pool_choice_2: { speaker: "", text: "I pull a beautiful piece of sea glass from the water.", choices: [{ text: "Pick up the Sea Glass", next: "find_glass" }] },
    pool_choice_yana: { speaker: "Yana", text: "She reaches into a tiny crevice, her brow furrowed in concentration. \"It's wedged in! Help me out, sayang?\"", choices: [{ text: "Help her reach the Pearl", next: "find_pearl" }] },
    dune_investigate: {
        speaker: "Yana",
        text: "She trudges up the sandy hill, the wind catching her hair. \"The sand is so deep here! I think I saw something spiral-shaped near the grass.\"",
        choices: [{ text: "Dig into the sand", next: "dune_choice_2", reply: "I dig where she's pointing. My fingers hit something hard and smooth." }]
    },
    dune_choice_2: { speaker: "", text: "I brush away the sand to reveal a perfect, large shell.", choices: [{ text: "Collect the Spiral Shell", next: "find_shell" }] },
    driftwood_investigate: {
        speaker: "",
        text: "I head toward the pile of old branches and tangled nets. It looks like a lot of things have washed up here lately.",
        choices: [
            { text: "Sort through the wood", next: "drift_choice_wood", reply: "I move a heavy branch. Tucked behind it is a piece of wood naturally shaped like a heart." },
            { text: "Check the old nets", next: "drift_choice_net", reply: "I spot something clear caught in the plastic mesh. It's a bottle, still intact." }
        ]
    },
    drift_choice_wood: { speaker: "", text: "The heart-shaped wood feels warm in my hand.", choices: [{ text: "Pick up the Heart Wood", next: "find_wood" }] },
    drift_choice_net: { speaker: "", text: "I carefully untangle the glass from the old fishing lines.", choices: [{ text: "Take the Glass Bottle", next: "find_bottle" }] },

    find_glass: { item: "Sea Glass", icon: "💎", desc: "A frosted blue fragment, smoothed by months of tides.", next: "explore_hub" },
    find_pearl: { item: "Shining Pearl", icon: "🫧", desc: "A rare shimmer found in a secret crevice.", next: "explore_hub" },
    find_shell: { item: "Spiral Shell", icon: "🐚", desc: "A spiral shell with rings, showing its age.", next: "explore_hub" },
    find_wood: { item: "Heart Wood", icon: "🪵", desc: "A heart shaped wood that drifted from afar.", next: "explore_hub" },
    find_bottle: { item: "Glass Bottle", icon: "🍾", desc: "A clear vessel, perhaps I could fill this up.", next: "explore_hub" },

    sunset_ready: {
        speaker: "Yana",
        text: "She looks at our collection and beams. \"We have everything! Before we seal them in the bottle, let's look at them one more time together.\"",
        action: "triggerSunset",
        choices: [{ text: "Sit down with her", next: "review_items" }]
    }
};

function renderScene(key) {
    if (key === "explore_hub" && bag.length === totalTreasures) {
        renderScene("sunset_ready");
        return;
    }

    // item review
    if (key === "review_items") {
        const itemName = Object.keys(reviewMetaphors)[itemReviewIndex];
        const data = reviewMetaphors[itemName];
        
        // show popout automatically
        showItemPopup({icon: data.icon, item: itemName, desc: "This..."}, true);

        document.getElementById('speaker-name').innerText = "Yana";
        document.getElementById('dialogue-text').innerText = data.yana;
        
        const container = document.getElementById('choice-buttons');
        container.innerHTML = `<button class="ui-btn" onclick="reviewNext()">${data.carl}</button>`;
        return;
    }

    if (key === "trigger_writing") {
        document.getElementById('letter-ui').classList.remove('hidden');
        return;
    }

    const scene = story[key];
    if (scene.action === "triggerSunset") document.getElementById('sky').className = "sky sunset";

    if (scene.item) {
        if (bag.includes(scene.item)) {
            document.getElementById('speaker-name').innerText = "Yana";
            document.getElementById('dialogue-text').innerText = "\"Sayang, I think we've already searched this spot thoroughly. Let's check somewhere else!\"";
            document.getElementById('choice-buttons').innerHTML = `<button class="ui-btn" onclick="renderScene('explore_hub')">Look elsewhere</button>`;
        } else {
            showItemPopup(scene);
        }
        return;
    }

    document.getElementById('speaker-name').innerText = scene.speaker || "";
    document.getElementById('dialogue-text').innerText = scene.text;
    const container = document.getElementById('choice-buttons');
    container.innerHTML = '';

    scene.choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = "ui-btn";
        btn.innerText = choice.text;
        btn.onclick = () => {
            if (choice.reply) {
                document.getElementById('dialogue-text').innerText = choice.reply;
                container.innerHTML = `<button class="ui-btn" onclick="renderScene('${choice.next}')">Continue...</button>`;
            } else {
                renderScene(choice.next);
            }
        };
        container.appendChild(btn);
    });
}

function reviewNext() {
    itemReviewIndex++;
    document.getElementById('item-popup').classList.add('hidden');
    if (itemReviewIndex < totalTreasures) {
        renderScene("review_items");
    } else {
        // move to the final speech before writing
        document.getElementById('speaker-name').innerText = "Yana";
        document.getElementById('dialogue-text').innerText = "\"Everything we found... it's like a map of us. Let's put our promises on paper now, Carl.\"";
        document.getElementById('choice-buttons').innerHTML = `<button class="ui-btn" onclick="renderScene('trigger_writing')">Open the paper</button>`;
    }
}

function showItemPopup(scene, isReview = false) {
    document.getElementById('popup-icon').innerText = scene.icon;
    document.getElementById('popup-title').innerText = scene.item;
    document.getElementById('popup-desc').innerText = scene.desc;
    document.getElementById('item-popup').classList.remove('hidden');
    
    const btn = document.getElementById('close-popup');
    if (isReview) {
        btn.innerText = "Reflect together";
        btn.onclick = () => document.getElementById('item-popup').classList.add('hidden');
    } else {
        btn.onclick = () => {
            bag.push(scene.item);
            document.getElementById('inv-count').innerText = bag.length;
            document.getElementById('item-popup').classList.add('hidden');
            renderScene(scene.next);
        };
    }
}

function toggleInventory() {
    const list = document.getElementById('inventory-list');
    list.innerHTML = "";
    Object.keys(reviewMetaphors).forEach(name => {
        const item = reviewMetaphors[name];
        const hasIt = bag.includes(name);
        list.innerHTML += `
            <div class="inv-slot ${hasIt ? '' : 'locked'}">
                <div class="inv-icon">${hasIt ? item.icon : '?'}</div>
                <div class="inv-name">${hasIt ? name : '???'}</div>
            </div>`;
    });
    document.getElementById('inventory-modal').classList.toggle('hidden');
}

function finishWriting() {
    carlMessage = document.getElementById('letter-input').value || "I promise to love you always.";
    document.getElementById('letter-ui').classList.add('hidden');
    showExchangeOptions();
}

function showExchangeOptions() {
    document.getElementById('speaker-name').innerText = "Yana";
    document.getElementById('dialogue-text').innerText = "She hands me her paper with a nervous smile. \"I'm ready when you are, Carl.\"";
    const container = document.getElementById('choice-buttons');
    container.innerHTML = `
        <button class="ui-btn" onclick="viewLetter('Yana')">Read Yana's Letter</button>
        <button class="ui-btn" onclick="viewLetter('Carl')">Check My Own Letter</button>
        <button class="ui-btn" onclick="startEnding()">Seal and Cast into the Sea</button>
    `;
}

function viewLetter(who) {
    const popup = document.getElementById('letter-view-popup');
    const content = document.getElementById('letter-content');
    const tag = document.getElementById('letter-from-tag');
    tag.innerText = who === 'Yana' ? "FROM: Yana" : "FROM: Carl";
    content.innerText = who === 'Yana' ? yanaLetter : carlMessage;
    popup.classList.remove('hidden');
    document.getElementById('close-letter-view').onclick = () => popup.classList.add('hidden');
}

function startEnding() {
    document.getElementById('game-ui').classList.add('hidden');
    document.querySelector('.sun').classList.add('setting');
    setTimeout(() => {
        document.getElementById('sky').className = "sky night";
        document.getElementById('drifting-bottle').classList.remove('hidden');
    }, 2000);
    setTimeout(() => { document.querySelector('.moon').classList.add('rising'); }, 4500);
    setTimeout(() => { document.getElementById('final-message').classList.remove('hidden'); }, 13000);
}

renderScene('start');