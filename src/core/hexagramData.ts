// export const HEXAGRAM_DATA: Record<
//   number,
//   {
//     name: string;
//     judgment: string;
//     image: string;
//     lines: string[];
//   }
// > = {
//   1: {
//     name: "Qian — The Creative",
//     judgment:
//       "The Creative works sublime success, furthering through perseverance.",
//     image:
//       "The movement of heaven is full of power. Thus the superior man makes himself strong and untiring.",
//     lines: [
//       "Hidden dragon. Do not act.",
//       "Dragon appearing in the field. It furthers one to see the great man.",
//       "All day long the superior man is creatively active.",
//       "Wavering flight over the depths.",
//       "Flying dragon in the heavens.",
//       "Arrogant dragon will have cause to repent.",
//     ],
//   },

//   2: {
//     name: "Kun — The Receptive",
//     judgment:
//       "The Receptive brings about sublime success, furthering through the perseverance of a mare.",
//     image:
//       "The earth's condition is receptive devotion.",
//     lines: [
//       "When there is hoarfrost, solid ice is not far off.",
//       "Straight, square, great.",
//       "Hidden lines. One is able to remain persevering.",
//       "A tied-up sack. No blame, no praise.",
//       "A yellow lower garment brings supreme good fortune.",
//       "Dragons fight in the meadow.",
//     ],
//   },

//   28: {
//     name: "Da Guo — Preponderance of the Great",
//     judgment:
//       "The ridgepole sags to the breaking point. It furthers one to have somewhere to go.",
//     image:
//       "The lake rises above the trees.",
//     lines: [
//       "To spread white rushes underneath.",
//       "A dry poplar sprouts at the root.",
//       "The ridgepole sags to the breaking point.",
//       "The ridgepole is braced.",
//       "A withered poplar puts forth flowers.",
//       "One must go through the water.",
//     ],
//   },
// };


// 1 - 8
export const HEXAGRAM_DATA: Record<number, {
  name: string;
  judgment: string;
  image: string;
  lines: string[];
  meaning: string;
}> = {

  1: {
    name: "Qian — The Creative",
    judgment:
      "The Creative works sublime success, furthering through perseverance. Its movement is full of power. Thus the superior man makes himself strong and untiring.",
    image:
      "The movement of heaven is full of power. Thus the superior man makes himself strong and untiring.",
    lines: [
      "Hidden dragon. Do not act.",
      "Dragon appearing in the field. It furthers one to see the great man.",
      "All day long the superior man is creatively active.",
      "Wavering flight over the depths. No blame.",
      "Flying dragon in the heavens. It furthers one to see the great man.",
      "Arrogant dragon will have cause to repent."
    ],
    meaning:
      "The Creative represents pure yang energy — the primal, initiating force of heaven. It embodies strength, perseverance, and the power of origination. This hexagram calls for bold action aligned with cosmic order, reminding us that creative power, when used with discipline and humility, brings sublime success. It is the force that sets all things in motion."
  },

  2: {
    name: "Kun — The Receptive",
    judgment:
      "The Receptive brings about sublime success, furthering through the perseverance of a mare. If the superior man undertakes something and tries to lead, he goes astray; but if he follows, he finds guidance.",
    image:
      "The earth's condition is receptive devotion. Thus the superior man who has breadth of character carries the outer world.",
    lines: [
      "When there is hoarfrost underfoot, solid ice is not far off.",
      "Straight, square, great. Without purpose, yet nothing remains unfurthered.",
      "Hidden lines. One is able to remain persevering.",
      "A tied-up sack. No blame, no praise.",
      "A yellow lower garment brings supreme good fortune.",
      "Dragons fight in the meadow. Their blood is black and yellow."
    ],
    meaning:
      "The Receptive is pure yin — yielding, nurturing, and devoted. As earth receives heaven's creative impulse and brings forth life, this hexagram teaches the wisdom of receptivity. Success comes not through assertion but through devoted service and openness. Following rather than leading, accepting rather than resisting — these are the paths to fulfillment here."
  },

  3: {
    name: "Zhun — Difficulty at the Beginning",
    judgment:
      "Difficulty at the Beginning works supreme success, furthering through perseverance. Nothing should be undertaken. It furthers one to appoint helpers.",
    image:
      "Clouds and thunder: The image of Difficulty at the Beginning. Thus the superior man brings order out of confusion.",
    lines: [
      "Hesitation and hindrance. It furthers one to remain persevering.",
      "Difficulties pile up. Horse and wagon part.",
      "Whoever hunts deer without the forester only loses his way.",
      "Horse and wagon part. Strive for union.",
      "Difficulties in blessing. A little perseverance brings good fortune.",
      "Horse and wagon part. Bloody tears flow."
    ],
    meaning:
      "Like a seed pushing through hard soil, this hexagram captures the painful yet necessary struggle of new beginnings. The chaos of birth precedes all order. Rather than forcing premature action, seek guidance and allies — the right helpers make the impossible possible. Perseverance through initial hardship is the seed of future success."
  },

  4: {
    name: "Meng — Youthful Folly",
    judgment:
      "Youthful Folly has success. It is not I who seek the young fool; the young fool seeks me.",
    image:
      "A spring wells up at the foot of the mountain: The image of Youth. Thus the superior man fosters his character by thoroughness in all that he does.",
    lines: [
      "To make a fool develop it furthers one to apply discipline.",
      "To bear with fools in kindliness brings good fortune.",
      "Take not a maiden who, when she sees a man of bronze, loses possession of herself.",
      "Entangled folly brings humiliation.",
      "Childlike folly brings good fortune.",
      "In punishing folly it does not further one to commit transgressions."
    ],
    meaning:
      "Youthful Folly speaks to the inexperience of the beginner and the importance of genuine seeking. The teacher does not chase the student — the student must come with sincere desire to learn. Discipline, humility, and willingness to be corrected transform raw ignorance into wisdom. Every master was once a fool who kept asking questions."
  },

  5: {
    name: "Xu — Waiting",
    judgment:
      "Waiting. If you are sincere, you have light and success. Perseverance brings good fortune.",
    image:
      "Clouds rise up to heaven: The image of Waiting. Thus the superior man eats and drinks, is joyous and of good cheer.",
    lines: [
      "Waiting in the meadow. It furthers one to abide in what endures.",
      "Waiting on the sand. There is some gossip.",
      "Waiting in the mud brings about the arrival of the enemy.",
      "Waiting in blood. Get out of the pit.",
      "Waiting at meat and drink. Perseverance brings good fortune.",
      "One falls into the pit. Three uninvited guests arrive."
    ],
    meaning:
      "Xu counsels patient, nourishing waiting — not passive resignation but confident trust in right timing. The clouds are gathering; rain will come. While waiting, the wise person tends to themselves: eating, resting, remaining joyful. Anxiety and premature action only exhaust resources and invite danger. Strength lies in knowing when not to move."
  },

  6: {
    name: "Song — Conflict",
    judgment:
      "Conflict. You are sincere and are being obstructed. A cautious halt halfway brings good fortune.",
    image:
      "Heaven and water go their opposite ways: The image of Conflict. Thus in all his transactions the superior man carefully considers the beginning.",
    lines: [
      "If one does not perpetuate the affair, there is a little gossip.",
      "One cannot engage in conflict; one returns home.",
      "To nourish oneself on ancient virtue induces perseverance.",
      "One cannot engage in conflict. One turns back.",
      "To contend before him brings supreme good fortune.",
      "Even if by chance a leather belt is bestowed on one, by the end of a morning it will have been snatched away three times."
    ],
    meaning:
      "Conflict arises when inner sincerity meets outer obstruction — when heaven and water flow in opposing directions. This hexagram warns that while you may be in the right, pressing a conflict to its end rarely brings lasting victory. The wise course is to stop halfway, seek mediation, and consider how the seeds of conflict were sown at the very beginning of the matter."
  },

  7: {
    name: "Shi — The Army",
    judgment:
      "The Army. The army needs perseverance and a strong man. Good fortune without blame.",
    image:
      "In the middle of the earth is water: The image of the Army. Thus the superior man increases his masses by generosity toward the people.",
    lines: [
      "An army must set forth in proper order.",
      "In the midst of the army. Good fortune.",
      "Perchance the army carries corpses in the wagon.",
      "The army retreats. No blame.",
      "There is game in the field. It furthers one to catch it.",
      "The great prince issues commands."
    ],
    meaning:
      "The Army represents organized collective effort under strong, trustworthy leadership. Just as water hidden in the earth becomes an inexhaustible resource, a leader who treats people generously builds a deep reservoir of loyal strength. This hexagram addresses the necessity of disciplined action in the face of real threats — but warns that war must be just, leadership must be wise, and rewards must be proportionate."
  },

  8: {
    name: "Bi — Holding Together",
    judgment:
      "Holding Together brings good fortune. Inquire of the oracle once again whether you possess sublimity, constancy, and perseverance.",
    image:
      "On the earth is water: The image of Holding Together. Thus the kings of antiquity bestowed the different states as fiefs and cultivated friendly relations.",
    lines: [
      "Hold to him in truth and loyalty.",
      "Hold to him inwardly. Perseverance brings good fortune.",
      "You hold together with the wrong people.",
      "Hold to him outwardly also.",
      "Manifestation of holding together.",
      "He finds no head for holding together. Misfortune."
    ],
    meaning:
      "Holding Together calls for unity — the conscious joining of individuals around a worthy center. Like water finding its level across the earth, people naturally seek alignment. But this unity must be genuine, built on inner loyalty and truth rather than mere convenience. The question the hexagram poses is unflinching: are you truly worthy to be the gathering point, or are you seeking the wrong alliances?"
  },

  9: {
    name: "Xiao Chu — The Taming Power of the Small",
    judgment:
      "The Taming Power of the Small has success. Dense clouds, no rain from our western region.",
    image:
      "The wind drives across heaven: The image of The Taming Power of the Small. Thus the superior man refines the outward aspect of his nature.",
    lines: [
      "Return to the way. How could there be blame in this?",
      "He allows himself to be drawn into returning.",
      "The spokes burst out of the wagon wheels.",
      "If you are sincere, blood vanishes and fear gives way.",
      "If you are sincere and loyally attached, you are rich in your neighbor.",
      "The rain comes, there is rest."
    ],
    meaning:
      "Small forces can restrain great ones — but only temporarily, and only through gentle, persistent effort. The clouds have gathered but the rain has not yet fallen; the tension is real but the release is not yet due. This hexagram counsels refinement of conduct and small, careful steps rather than bold strokes. Inner sincerity is the force that gradually overcomes resistance."
  },

  10: {
    name: "Lu — Treading (Conduct)",
    judgment:
      "Treading. Treading upon the tail of the tiger. It does not bite the man. Success.",
    image:
      "Heaven above, the lake below: The image of Treading. Thus the superior man discriminates between high and low.",
    lines: [
      "Simple conduct. Progress without blame.",
      "Treading a smooth, level course.",
      "A one-eyed man is able to see.",
      "He treads on the tail of the tiger.",
      "Resolute conduct.",
      "Look to your conduct and weigh the favorable signs."
    ],
    meaning:
      "Treading is the hexagram of propriety and careful conduct in situations fraught with danger. Walking behind the tiger and not being bitten is a matter of how you walk — with clarity, simplicity, and correct positioning. Social hierarchies exist; knowing your place within them and moving with dignity and awareness is not submission but wisdom. Right conduct is its own protection."
  },

  11: {
    name: "Tai — Peace",
    judgment:
      "Peace. The small departs, the great approaches. Good fortune. Success.",
    image:
      "Heaven and earth unite: The image of Peace. Thus the superior man regulates the gifts of heaven and earth.",
    lines: [
      "When ribbon grass is pulled up, the sod comes with it.",
      "Bearing with the uncultured in gentleness.",
      "No plain not followed by a slope.",
      "He flutters down, not boasting of his wealth.",
      "The sovereign gives his daughter in marriage.",
      "The wall falls back into the moat."
    ],
    meaning:
      "Peace arrives when heaven descends and earth rises to meet it — when what is great becomes accessible and what is small recedes. This is a time of creative harmony, prosperity, and fruitful union between all polarities. Yet Tai also cautions: no state of peace is permanent. The superior person uses this fortunate time wisely, preparing for the inevitable turn, never growing complacent in good fortune."
  },

  12: {
    name: "Pi — Standstill (Stagnation)",
    judgment:
      "Standstill. Evil people do not further the perseverance of the superior man.",
    image:
      "Heaven and earth do not unite: The image of Standstill. Thus the superior man falls back upon his inner worth.",
    lines: [
      "When ribbon grass is pulled up, the sod comes with it.",
      "They bear and endure.",
      "They bear shame.",
      "He who acts at the command of the highest remains without blame.",
      "Standstill is giving way.",
      "The standstill comes to an end."
    ],
    meaning:
      "Standstill is the inverse of Peace: heaven draws upward and earth sinks downward, the two primal forces moving apart, communication broken. In times of stagnation and obstruction — when inferior forces hold sway — the person of worth does not struggle in vain but retreats inward, preserving integrity and waiting for the inevitable turn. All standstills eventually end."
  },

  13: {
    name: "Tong Ren — Fellowship with Men",
    judgment:
      "Fellowship with Men in the open. Success. It furthers one to cross the great water.",
    image:
      "Heaven together with fire: The image of Fellowship with Men. Thus the superior man organizes the clans.",
    lines: [
      "Fellowship with men at the gate.",
      "Fellowship with men in the clan.",
      "He hides weapons in the thicket.",
      "He climbs up on his wall.",
      "Men bound in fellowship first weep and lament.",
      "Fellowship with men in the meadow."
    ],
    meaning:
      "True fellowship requires openness — it cannot thrive in cliquishness, suspicion, or hidden agendas. When people unite in the open, under the broad light of heaven, great undertakings become possible. This hexagram warns against the exclusive fellowship of factions and calls for the inclusive solidarity of shared purpose. Only unity built on honesty can withstand great trials."
  },

  14: {
    name: "Da You — Possession in Great Measure",
    judgment:
      "Possession in Great Measure. Supreme success.",
    image:
      "Fire in heaven above: The image of Possession in Great Measure. Thus the superior man curbs evil and furthers good.",
    lines: [
      "No relationship with what is harmful.",
      "A big wagon for loading.",
      "A prince offers it to the Son of Heaven.",
      "He makes a difference between himself and his neighbor.",
      "He whose truth is accessible, yet dignified, has good fortune.",
      "He is blessed by heaven."
    ],
    meaning:
      "Great abundance has been attained — wealth, influence, and capacity beyond ordinary measure. Yet the fire of clarity burning in high heaven illuminates everything: such abundance brings responsibility. The person who possesses greatly must actively suppress what is harmful and promote what is good. Modesty, generosity, and alignment with higher principles are what keep great fortune from becoming a burden."
  },

  15: {
    name: "Qian — Modesty",
    judgment:
      "Modesty creates success. The superior man carries things through.",
    image:
      "Within the earth, a mountain: The image of Modesty. Thus the superior man reduces that which is too much.",
    lines: [
      "A superior man modest about his modesty.",
      "Modesty that comes to expression.",
      "A superior man of modesty and merit.",
      "Nothing that would not further modesty.",
      "No boasting of wealth before one's neighbor.",
      "Modesty that comes to expression."
    ],
    meaning:
      "A great mountain hidden beneath the earth — this is the image of true modesty. Not false self-deprecation, but genuine equanimity: reducing what is excessive, elevating what is insufficient, and creating balance in all things. Of all the hexagrams, Modesty is unique in bringing good fortune in every line. The person of genuine merit who does not parade it attracts enduring respect and success."
  },

  16: {
    name: "Yu — Enthusiasm",
    judgment:
      "Enthusiasm. It furthers one to install helpers and to set armies marching.",
    image:
      "Thunder comes resounding out of the earth: The image of Enthusiasm. Thus the ancient kings made music.",
    lines: [
      "Enthusiasm that expresses itself brings misfortune.",
      "Firm as a rock.",
      "Enthusiasm that looks upward creates remorse.",
      "The source of enthusiasm.",
      "Persistently ill, and still does not die.",
      "Deluded enthusiasm."
    ],
    meaning:
      "Enthusiasm is the electrifying force that moves masses — the thunder bursting from earth, the music that stirs the heart. When properly channeled, it inspires devoted followers and makes great collective action possible. But enthusiasm ungrounded in reality becomes delusion, and enthusiasm that serves only the ego brings downfall. The key is to be a true source of inspiration: grounded, sincere, and attuned to the needs of others."
  },

  17: {
    name: "Sui — Following",
    judgment: "Following has supreme success. Perseverance furthers. No blame.",
    image: "Thunder in the lake: The image of Following. Thus the superior man at nightfall goes indoors for rest.",
    lines: [
      "The standard is changing.",
      "If one clings to the little boy, one loses the strong man.",
      "If one clings to the strong man, one loses the little boy.",
      "Following creates success.",
      "Sincere in the good.",
      "He meets with firm loyalty."
    ],
    meaning:
      "Following is not weakness — it is the art of intelligent adaptation. Thunder resting within the lake knows when to be still; the superior man follows the rhythms of the day, resting when rest is called for. True following requires discernment: one must choose what is worth following and let go of what is not. Sincere, flexible responsiveness to what is genuinely good leads to supreme success."
  },

  18: {
    name: "Gu — Work on What Has Been Spoiled",
    judgment: "Work on what has been spoiled has supreme success. It furthers one to cross the great water.",
    image: "The wind blows low on the mountain: The image of Decay. Thus the superior man stirs up the people.",
    lines: [
      "Setting right what has been spoiled by the father.",
      "Setting right what has been spoiled by the mother.",
      "Setting right what has been spoiled by the father.",
      "Tolerating what has been spoiled.",
      "Setting right what has been spoiled.",
      "He does not serve kings and princes."
    ],
    meaning:
      "Decay is not the end — it is an invitation to renewal. This hexagram addresses the damage done by neglect, complacency, or inherited mistakes. The work of repair is difficult and demands clear-eyed assessment of what has been allowed to rot. But such renovation, when undertaken with courage and thoroughness, leads to supreme success. To face and fix decay is itself a form of creative power."
  },

  19: {
    name: "Lin — Approach",
    judgment: "Approach has supreme success. Perseverance furthers.",
    image: "The earth above the lake: The image of Approach. Thus the superior man is inexhaustible in his will to teach, and without limit in his tolerance.",
    lines: [
      "Joint approach.",
      "Joint approach. Good fortune.",
      "Comfortable approach.",
      "Complete approach.",
      "Wise approach.",
      "Great-hearted approach."
    ],
    meaning:
      "Approach describes a time of drawing near — of favorable powers advancing, of spring approaching after winter. Opportunity is expanding and the moment is ripe for decisive engagement. Leadership here is best exercised through genuine concern for others, inexhaustible willingness to guide, and patient tolerance. The favorable tide will not last forever; act while it is strong, but with wisdom."
  },

  20: {
    name: "Guan — Contemplation",
    judgment: "Contemplation. The ablution has been made, but not yet the offering. Full of trust they look up to him.",
    image: "The wind blows over the earth: The image of Contemplation. Thus the kings of old visited the regions of the world.",
    lines: [
      "Boylike contemplation.",
      "Contemplation through the crack of the door.",
      "Contemplation of my life decides.",
      "Contemplation of the light of the kingdom.",
      "Contemplation of my life.",
      "Contemplation of his life."
    ],
    meaning:
      "Contemplation is the hexagram of inner and outer observation — of seeing clearly and being seen. Like a great tower visible across the land, the person who has cultivated deep self-knowledge becomes a natural point of orientation for others. The highest contemplation moves from the outward inspection of the world to the inward examination of one's own life, ultimately reaching a detached understanding that transcends the personal."
  },

  21: {
    name: "Shi He — Biting Through",
    judgment: "Biting Through has success. It is favorable to let justice be administered.",
    image: "Thunder and lightning: The image of Biting Through. Thus the kings of former times made firm the laws through clearly defined penalties.",
    lines: [
      "His feet are fastened in the stocks.",
      "Bites through tender meat.",
      "Bites on old dried meat.",
      "Bites on dried gristly meat.",
      "Bites on dried lean meat.",
      "His neck is fastened in the wooden cangue."
    ],
    meaning:
      "An obstacle stands between the open jaws — it must be bitten through with decisive force. Shi He is the hexagram of justice: when obstacles to union are willful wrongdoing or entrenched resistance, they must be removed through clear, firm action. Half-measures will not suffice. The lightning illuminates; the thunder enforces. Clarity and decisiveness together make justice possible."
  },

  22: {
    name: "Bi — Grace",
    judgment: "Grace has success. In small matters it is favorable to undertake something.",
    image: "Fire at the foot of the mountain: The image of Grace. Thus does the superior man proceed when clearing up current affairs.",
    lines: [
      "He lends grace to his toes.",
      "Lends grace to the beard.",
      "Graceful and moist.",
      "Grace or simplicity?",
      "Grace in hills and gardens.",
      "Simple grace. No blame."
    ],
    meaning:
      "Grace is the beautification of form — the fire at the mountain's foot illuminating its contours without changing its substance. Adornment and elegance have their place, making life richer and more beautiful. But this hexagram carries a quiet warning: outer grace must never replace inner substance. The highest grace is simplicity itself — form and content unified, beauty arising naturally from truth."
  },

  23: {
    name: "Bo — Splitting Apart",
    judgment: "Splitting Apart. It does not further one to go anywhere.",
    image: "The mountain rests upon the earth: The image of Splitting Apart. Thus those above can ensure their position only by giving generously to those below.",
    lines: [
      "The leg of the bed is split.",
      "The bed is split at the edge.",
      "He splits with them.",
      "The bed is split up to the skin.",
      "A shoal of fishes.",
      "There is a large fruit still uneaten."
    ],
    meaning:
      "Splitting Apart represents the peak of yin's advance — the dark forces have eroded almost everything, like a bed being cut away from beneath the sleeper. This is not a time for action or grand undertakings, but for endurance. Yet even at the darkest moment the seed of renewal persists: the large fruit still uneaten contains within it the life of future trees. What cannot be prevented must be endured until the cycle turns."
  },

  24: {
    name: "Fu — Return",
    judgment: "Return. Success. Going out and coming in without error. Friends come without blame.",
    image: "Thunder within the earth: The image of the Turning Point. Thus the kings of antiquity closed the passes at the time of solstice.",
    lines: [
      "Return from a short distance.",
      "Quiet return. Good fortune.",
      "Repeated return.",
      "Walking in the midst of others.",
      "Noblehearted return.",
      "Missing the return."
    ],
    meaning:
      "Return is the winter solstice of the I Ching — the moment the light is reborn from within the deepest darkness. A single yang line stirs below five yin lines: small, new, tender. This is not yet a time for bold action, but for quiet nurturing of the returning force. The ancient kings honored this turning point with rest and stillness, giving the new beginning space to grow. Every genuine return to one's true path is cause for quiet celebration."
  },

  25: {
    name: "Wu Wang — Innocence",
    judgment: "Innocence. Supreme success. Perseverance furthers. If someone is not as he should be, he has misfortune.",
    image: "Thunder beneath heaven: The image of Innocence. Thus the kings of old nurtured and nourished all beings.",
    lines: [
      "Innocent behavior brings good fortune.",
      "If one does not count on the harvest.",
      "Undeserved misfortune.",
      "He who can be persevering remains without blame.",
      "Use no medicine.",
      "Innocent action brings misfortune."
    ],
    meaning:
      "Innocence — Wu Wang, without falseness — is spontaneous, natural action aligned with the deeper order of heaven. It is not naivety but integrity: acting without hidden agenda, expectation, or calculation. When action flows from this pure place, supreme success is natural. But the moment one acts from cunning or self-interest, the innocence is lost and misfortune follows. The greatest wisdom is to reclaim and maintain this primal naturalness."
  },

  26: {
    name: "Da Chu — Taming Power of the Great",
    judgment: "Perseverance furthers. Not eating at home brings good fortune. It furthers one to cross the great water.",
    image: "Heaven within the mountain: The image of Taming Power of the Great. Thus the superior man acquaints himself with many sayings of antiquity.",
    lines: [
      "Danger is at hand.",
      "The axles are taken from the wagon.",
      "A good horse that follows others.",
      "The headboard of a young bull.",
      "The tusk of a gelded boar.",
      "One attains the way of heaven."
    ],
    meaning:
      "Heaven contained within the mountain: tremendous power held and accumulated. This hexagram speaks of the capacity to restrain great forces — not through weakness, but through superior inner strength. The wise person engages with the world, studies the accumulated wisdom of ages, and develops the inner resources to handle great power safely. When the time is right, the stored energy is released and great undertakings become possible."
  },

  27: {
    name: "Yi — Nourishment",
    judgment: "Nourishment. Perseverance brings good fortune. Pay heed to the providing of nourishment and to what a man seeks to fill his own mouth with.",
    image: "Mountain at the foot of thunder: The image of Nourishment. Thus the superior man is careful of his words and temperate in eating and drinking.",
    lines: [
      "You let your magic turtle go.",
      "Turning to the summit for nourishment.",
      "Turning away from nourishment.",
      "Turning to the summit for provision.",
      "Turning away from the path.",
      "The source of nourishment."
    ],
    meaning:
      "Yi asks us to examine what we nourish — and what nourishes us. The mountain is still, the thunder stirs: proper nourishment requires both rootedness and vitality. We must attend to the quality of what we take in — food, words, thought, relationship — and to what we put out into the world. The person who nourishes others from a place of genuine inner fullness becomes a source of life for all around them."
  },

  28: {
    name: "Da Guo — Preponderance of the Great",
    judgment: "The ridgepole sags to the breaking point. It furthers one to have somewhere to go. Success.",
    image: "The lake rises above the trees: The image of Preponderance of the Great. Thus the superior man, when he stands alone, is unconcerned.",
    lines: [
      "To spread white rushes underneath.",
      "A dry poplar sprouts at the root.",
      "The ridgepole sags.",
      "The ridgepole is braced.",
      "A withered poplar puts forth flowers.",
      "One must go through the water."
    ],
    meaning:
      "The beam has grown too heavy — the structure is under extraordinary stress. Da Guo signals an exceptional time requiring exceptional measures. The ordinary rules do not apply; conventional paths are closed. The person who can act with uncanny independence, holding firm when the weight becomes almost unbearable, finds a way through. Even unconventional action is justified when the situation is truly extraordinary."
  },

  29: {
    name: "Kan — The Abysmal",
    judgment: "The Abysmal repeated. If you are sincere, you have success in your heart, and whatever you do succeeds.",
    image: "Water flows on uninterruptedly and reaches its goal: The image of the Abysmal. Thus the superior man walks in lasting virtue.",
    lines: [
      "Repetition of the Abysmal.",
      "The abyss is dangerous.",
      "Forward and backward, abyss on abyss.",
      "A jug of wine, a bowl of rice.",
      "The abyss is not filled to overflowing.",
      "Bound with cords and ropes."
    ],
    meaning:
      "Danger upon danger — the abyss repeated. Kan is water: it fills every depression without losing its nature, flows through every obstacle, and always finds its way to the sea. The lesson is not to fear danger but to become like water — consistent, sincere, and persevering. Inner truth is the only thing that does not drown in the abyss. By holding to what is genuinely trustworthy within, one passes through even the most perilous straits."
  },

  30: {
    name: "Li — The Clinging, Fire",
    judgment: "The Clinging. Perseverance furthers. It brings success. Care of the cow brings good fortune.",
    image: "That which is bright rises twice: The image of Fire. Thus the great man, by perpetuating this brightness, illumines the four quarters.",
    lines: [
      "The footprints run crisscross.",
      "Yellow light.",
      "In the light of the setting sun.",
      "Its coming is sudden.",
      "Tears in floods, sighing and lamenting.",
      "The king uses him to march forth."
    ],
    meaning:
      "Fire clings to its fuel just as clarity clings to what it illuminates: this is the nature of Li. Brightness, consciousness, and awareness must always adhere to something — the question is what we choose to cling to. By attaching to what is central and true, the light grows; by clinging to what is peripheral or false, it consumes itself. The great person perpetuates illumination by nurturing the inner life that sustains the outward brilliance."
  },

  31: {
    name: "Xian — Influence",
    judgment: "Influence. Success. Perseverance furthers. To take a maiden to wife brings good fortune.",
    image: "A lake on the mountain: The image of Influence. Thus the superior man encourages people to approach him by his readiness to receive them.",
    lines: [
      "The influence shows itself in the big toe.",
      "The influence shows itself in the calves.",
      "The influence shows itself in the thighs.",
      "Perseverance brings good fortune. Remorse vanishes.",
      "The influence shows itself in the back of the neck.",
      "The influence shows itself in the jaws, cheeks, and tongue."
    ],
    meaning:
      "Xian is the mutual attraction between heaven and earth, yin and yang — the courtship at the heart of creation. The lake rests upon the mountain in quiet joy; the mountain supports the lake with patient strength. True influence arises from genuine responsiveness: being open, receptive, and empty of ego allows one to truly feel the other and be felt in return. The deepest connections are those free from calculation."
  },

  32: {
    name: "Heng — Duration",
    judgment: "Duration. Success. No blame. Perseverance furthers. It furthers one to have somewhere to go.",
    image: "Thunder and wind: The image of Duration. Thus the superior man stands firm and does not change his direction.",
    lines: [
      "Seeking duration too hastily brings misfortune persistently.",
      "Remorse disappears.",
      "He who does not give duration to his character.",
      "No game in the field.",
      "Giving duration to one's character through perseverance.",
      "Restlessness as an enduring condition brings misfortune."
    ],
    meaning:
      "Duration is not rigidity — it is the enduring constancy of thunder and wind, each reinforcing the other across time. The secret of lasting success is not force but the sustained movement that is true to its own nature. What must endure is not outer form but inner direction — the unwavering orientation toward what is right. Those whose character has genuine depth do not need to change with every wind; they are the wind."
  },

  33: {
    name: "Dun — Retreat",
    judgment: "Retreat. Success. In what is small, perseverance furthers.",
    image: "Mountain under heaven: The image of Retreat. Thus the superior man keeps the inferior man at a distance, not angrily but with reserve.",
    lines: [
      "At the tail in retreat.",
      "He holds him fast with yellow oxhide.",
      "A halted retreat is nerve-wracking and dangerous.",
      "Voluntary retreat brings good fortune to the superior man.",
      "Friendly retreat.",
      "Cheerful retreat."
    ],
    meaning:
      "Strategic retreat is not defeat — it is wisdom. When inferior forces are advancing and cannot be halted, the person of quality withdraws in good order, preserving strength and dignity. The retreat must be timely and willing: a cheerful withdrawal preserves everything; a forced or clinging retreat is humiliating. Knowing when to step back is as important as knowing when to advance."
  },

  34: {
    name: "Da Zhuang — Power of the Great",
    judgment: "The Power of the Great. Perseverance furthers.",
    image: "Thunder in heaven above: The image of the Power of the Great. Thus the superior man does not tread paths that do not accord with established order.",
    lines: [
      "Power in the toes. Continuing brings misfortune.",
      "Perseverance brings good fortune.",
      "The inferior man works through power. The superior man does not act thus.",
      "Perseverance brings good fortune. Remorse disappears.",
      "Loses the goat with ease. No remorse.",
      "A goat butts against a hedge and cannot go forward or back."
    ],
    meaning:
      "Great power has been attained, and now the test begins: will it be used wisely or recklessly? Thunder in heaven is magnificent but can also destroy. The superior person at the height of power chooses not to use force just because force is available — instead, they align even their great strength with what is right and ordered. Power exercised without righteousness ultimately traps itself."
  },

  35: {
    name: "Jin — Progress",
    judgment: "Progress. The powerful prince is honored with horses in large numbers. In a single day he is granted audience three times.",
    image: "The sun rises over the earth: The image of Progress. Thus the superior man himself brightens his bright virtue.",
    lines: [
      "Progressing, but turned back.",
      "Progressing, but in sorrow.",
      "All are in accord. Remorse disappears.",
      "Progress like a hamster. Perseverance brings danger.",
      "Remorse disappears.",
      "Making progress with the horns is permissible only for the purpose of punishing one's own city."
    ],
    meaning:
      "Jin is the sun rising freely over the earth — brilliant, rapid, unopposed progress. A time of recognition, advancement, and expanding influence. The image calls not just for outward achievement but for inner brightening: the superior person uses this time of progress to clarify their own virtue, becoming as luminous inside as the sun is without. Progress that comes without inner development leaves one hollow."
  },

  36: {
    name: "Ming Yi — Darkening of the Light",
    judgment: "Darkening of the Light. In adversity it furthers one to be persevering.",
    image: "The light has sunk into the earth: The image of Darkening of the Light. Thus does the superior man live with the great mass: he veils his light, yet still shines.",
    lines: [
      "Darkening of the light during flight.",
      "Darkening of the light injures him in the left thigh.",
      "Darkening of the light during the hunt in the south.",
      "He penetrates the left side of the belly.",
      "Darkening of the light as with Prince Chi.",
      "Neither light nor darkness."
    ],
    meaning:
      "The light has sunk into the earth — the sun is below the horizon, darkness prevails. This is the hexagram of persevering through dark times, of maintaining inner clarity while concealing it from hostile forces. Prince Chi served the tyrant Chou by feigning madness: inner truth preserved, outer compliance maintained. In times when ignorance holds power, wisdom must veil itself and endure. The light has not gone out; it has gone underground."
  },

  37: {
    name: "Jia Ren — The Family",
    judgment: "The Family. The perseverance of the woman furthers.",
    image: "Wind comes forth from fire: The image of the Family. Thus the superior man has substance in his words and duration in his way of life.",
    lines: [
      "Firm seclusion within the family.",
      "She should not follow her whims. She must attend within to the food.",
      "When tempers flare up in the family.",
      "She is the treasure of the house. Great good fortune.",
      "As a king he approaches his family. Fear not. Good fortune.",
      "His work commands respect. In the end good fortune comes."
    ],
    meaning:
      "The family is the fundamental unit of society — the place where character is first formed and where the principles of right relationship are lived out daily. Wind emerging from fire: words must be warm and true, backed by the substance of lived example. The family flourishes when each member fulfills their role with genuine care, and the influence of a well-ordered home radiates outward to transform society."
  },

  38: {
    name: "Kui — Opposition",
    judgment: "Opposition. In small matters, good fortune.",
    image: "Fire above, lake below: The image of Opposition. Thus amid all fellowship the superior man retains his individuality.",
    lines: [
      "Remorse disappears.",
      "One meets his lord in a narrow street. No blame.",
      "One sees the wagon dragged back.",
      "Isolated through opposition, one meets a like-minded man.",
      "Remorse disappears.",
      "Isolated through opposition."
    ],
    meaning:
      "Opposition, misunderstanding, and the feeling of being utterly alone — yet even in polarity, connection is possible. Fire moves upward, lake downward: two sisters in one house, their natures diverging. But opposition is not the end of relationship; it is a different mode of it. In small things, gradual reconciliation is possible. Amid all division, the person who holds to their own truth will eventually find their counterpart."
  },

  39: {
    name: "Jian — Obstruction",
    judgment: "Obstruction. The southwest furthers. The northeast does not further. It furthers one to see the great man. Perseverance brings good fortune.",
    image: "Water on the mountain: The image of Obstruction. Thus the superior man turns his attention to himself and molds his character.",
    lines: [
      "Going leads to obstructions; coming meets with praise.",
      "The king's servant is beset by obstruction upon obstruction.",
      "Going leads to obstructions; hence he comes back.",
      "Going leads to obstructions; coming leads to union.",
      "In the midst of the greatest obstructions, friends come.",
      "Going leads to obstructions; coming leads to great good fortune."
    ],
    meaning:
      "Water on the mountain cannot flow down — the way is blocked. When external obstacles cannot be removed, the wise person turns inward, using the obstruction as an occasion for self-cultivation. Seeking out a great teacher, building inner resources, and finding allies are more fruitful than beating against the wall. Every obstruction overcome deepens character; the blocked path often leads to a better destination than the original one."
  },

  40: {
    name: "Xie — Deliverance",
    judgment: "Deliverance. The southwest furthers. If there is no longer anything where one has to go, return brings good fortune. If there is still something where one has to go, hastening brings good fortune.",
    image: "Thunder and rain set in: The image of Deliverance. Thus the superior man pardons mistakes and forgives misdeeds.",
    lines: [
      "Without blame.",
      "One kills three foxes in the field and receives a yellow arrow. Perseverance brings good fortune.",
      "If a man carries a burden on his back and nonetheless rides in a carriage, he thereby encourages robbers to draw near.",
      "Deliver yourself from your great toe. Then the companion comes, and him you can trust.",
      "If only the superior man can deliver himself, good fortune comes.",
      "The prince shoots at a hawk on a high wall. He kills it. Everything serves to further."
    ],
    meaning:
      "After the tension of obstruction, release comes like thunder and rain after a long drought. Deliverance means liberation from what has been binding — but it demands swiftness. When the way opens, move at once; do not cling to the habits of the constrained time. Forgiveness is the inner counterpart to outer deliverance: just as thunder clears the atmosphere, the release of grievances clears the inner landscape."
  },

  41: {
    name: "Sun — Decrease",
    judgment: "Decrease combined with sincerity brings about supreme good fortune without blame. One may be persevering in this.",
    image: "At the foot of the mountain, the lake: The image of Decrease. Thus the superior man controls his anger and restrains his instincts.",
    lines: [
      "Going quickly when one's tasks are finished is without blame.",
      "Perseverance furthers. To undertake something brings misfortune.",
      "When three people journey together, their number decreases by one.",
      "If a man decreases his faults, it makes the other hasten to come and rejoice.",
      "Someone does indeed increase him. Ten pairs of tortoises cannot oppose it.",
      "If one is increased without depriving others, there is no blame."
    ],
    meaning:
      "Sun — decrease — teaches that sometimes less is more. Simplifying, restraining, and offering what one has to a higher purpose generates a sincerity and clarity that attracts blessings. The lake at the mountain's foot feeds the mountain's roots even as it seems to lose itself. Controlling anger and curbing excess desires is an inner decrease that paradoxically increases what is truly essential — integrity, clarity, and genuine connection."
  },

  42: {
    name: "Yi — Increase",
    judgment: "Increase. It furthers one to undertake something. It furthers one to cross the great water.",
    image: "Wind and thunder: The image of Increase. Thus the superior man, when he sees goodness, imitates it; when he has faults, he rids himself of them.",
    lines: [
      "It furthers one to accomplish great deeds. Supreme good fortune. No blame.",
      "Someone does indeed increase him. Ten pairs of tortoises cannot oppose it.",
      "One is enriched through unfortunate events. No blame.",
      "If you walk in the middle and report to the prince, he will follow.",
      "If in truth you have a kind heart, ask not. Supreme good fortune indeed.",
      "He brings increase to no one. Indeed, someone even strikes him."
    ],
    meaning:
      "Yi is the time of growth and expansion — when even what seems unfortunate turns to advantage. Wind and thunder reinforce each other; the superior person seizes this moment to imitate what is good and shed what is flawed. Increase flows to those who are genuinely of service to others; those who seek increase for themselves alone ultimately lose it. The greatest increase comes to those who enrich others."
  },

  43: {
    name: "Guai — Breakthrough",
    judgment: "Breakthrough. One must resolutely make the matter known at the court of the king. It must be announced truthfully.",
    image: "The lake has risen up to heaven: The image of Breakthrough. Thus the superior man dispenses riches downward and refrains from resting on his virtue.",
    lines: [
      "Mighty in the forward-striding toes. When one goes and is not equal to the task, one makes a mistake.",
      "A cry of alarm. Arms at evening and at night. Fear nothing.",
      "To be powerful in the cheekbones brings misfortune.",
      "There is no skin on his thighs. Walking becomes difficult. If a man were to let himself be led like a sheep, remorse would disappear.",
      "In dealing with weeds, firm resolution is necessary. Walking in the middle remains free of blame.",
      "No cry. In the end misfortune comes."
    ],
    meaning:
      "Guai is the breakthrough moment — five yang lines rising beneath a single yin, the accumulated force of truth pressing upward against the last stronghold of the inferior. The conflict must be resolved not through force alone but through public, truthful declaration of the problem. Even a single flaw, if left unchecked, can corrupt the whole. The superior person who dispenses generously and does not rest on past virtue prevents the return of what was overcome."
  },

  44: {
    name: "Gou — Coming to Meet",
    judgment: "Coming to Meet. The maiden is powerful. One should not marry such a maiden.",
    image: "Under heaven, wind: The image of Coming to Meet. Thus does the prince act when disseminating his commands and proclaiming them to the four quarters of heaven.",
    lines: [
      "It must be checked with a brake of bronze. Perseverance brings good fortune.",
      "There is a fish in the tank. No blame. Does not further guests.",
      "There is no skin on his thighs. One walks with difficulty.",
      "No fish in the tank. This leads to misfortune.",
      "A melon covered with willow leaves. Hidden lines. Then it drops down from heaven.",
      "He comes to meet with his horns. Humiliation, but no blame."
    ],
    meaning:
      "Gou is the unexpected encounter — one yin rising beneath five yang, the small infiltrating the great before it can be recognized. What first appears as a minor concession or harmless indulgence can, if allowed to take root, undermine everything. The ruler who broadcasts influence across the land must be equally alert to what subtle influences are broadcasting within. Early, firm action prevents what cannot be stopped later."
  },

  45: {
    name: "Cui — Gathering Together",
    judgment: "Gathering Together. Success. The king approaches his temple. It furthers one to see the great man. This brings success.",
    image: "Over the earth, the lake: The image of Gathering Together. Thus the superior man renews his weapons in order to meet the unforeseen.",
    lines: [
      "If you are sincere, but not to the end, there is sometimes confusion, sometimes gathering together.",
      "Letting oneself be drawn brings good fortune and remains blameless.",
      "Gathering together amid sighs. Nothing that would further.",
      "Great good fortune. No blame.",
      "If in gathering together one has position, this brings no blame.",
      "Lamenting and sighing, floods of tears. No blame."
    ],
    meaning:
      "Cui is the great gathering — people, resources, and energies concentrating around a worthy center. The lake rises above the earth; what was scattered becomes abundant. Such moments of convergence require a leader of genuine authority who can give the gathering its meaning and direction. The wise person also prepares in times of plenty, keeping their instruments sharp for the dangers that gathered power invariably attracts."
  },

  46: {
    name: "Sheng — Pushing Upward",
    judgment: "Pushing Upward has supreme success. One must see the great man. Fear not. Departure toward the south brings good fortune.",
    image: "Within the earth, wood grows upward: The image of Pushing Upward. Thus the superior man of devoted character heaps up small things in order to achieve something high and great.",
    lines: [
      "Pushing upward that meets with confidence brings great good fortune.",
      "If one is sincere, it furthers one to bring even a small offering.",
      "One pushes upward into an empty city.",
      "The king offers him Mount Ch'i. Good fortune. No blame.",
      "Perseverance brings good fortune. One pushes upward by steps.",
      "Pushing upward in darkness. It furthers one to be unremittingly persevering."
    ],
    meaning:
      "Sheng is the quiet, organic rise — wood growing upward from within the earth, accumulating small gains into something magnificent. Unlike sudden advancement, this ascent is gradual and grounded. The person of devoted character does not leap to the summit but climbs steadily, seeking out those with the wisdom to guide them. Persistence in darkness, even when the path is invisible, is the mark of genuine upward movement."
  },

  47: {
    name: "Kun — Oppression",
    judgment: "Oppression. Success. Perseverance. The great man brings about good fortune. No blame. When one has something to say, it is not believed.",
    image: "There is no water in the lake: The image of Exhaustion. Thus the superior man stakes his life on following his will.",
    lines: [
      "One sits oppressed under a bare tree and strays into a gloomy valley.",
      "One is oppressed while at meat and drink. The man with the scarlet knee bands is just coming.",
      "A man permits himself to be oppressed by stone. He seizes upon thorns.",
      "He comes very quietly, oppressed in a golden carriage. Humiliation, but the end is reached.",
      "His nose and feet are cut off. Oppression at the hands of the man with the purple knee bands.",
      "He is oppressed by creeping vines. He moves uncertainly and says, 'Movement brings remorse.'"
    ],
    meaning:
      "Kun is the hexagram of exhaustion and oppression — the lake drained of water, all resources spent. Yet the text promises success: the person who can maintain inner worth and genuine values when everything external has been stripped away possesses an unbreakable core. Words cannot rescue the oppressed; only action and character speak in dark times. The superior person stakes everything on living true to their convictions even when no one believes them."
  },

  48: {
    name: "Jing — The Well",
    judgment: "The Well. The town may be changed, but the well cannot be changed. It neither decreases nor increases. They come and go and draw from the well.",
    image: "Water over wood: The image of the Well. Thus the superior man encourages the people at their work and exhorts them to help one another.",
    lines: [
      "One does not drink the mud of the well. No animals come to an old well.",
      "At the well hole one shoots fishes. The jug is broken and leaks.",
      "The well is cleaned, but no one drinks from it. This is my heart's grief.",
      "The well is being lined. No blame.",
      "In the well there is a clear, cold spring from which one can drink.",
      "One draws from the well without hindrance. It is dependable. Supreme good fortune."
    ],
    meaning:
      "The Well is the inexhaustible source that sustains all life — towns can be relocated, kingdoms can rise and fall, but the well remains, giving its water to whoever draws from it. This hexagram speaks to the nature of the essential: genuine wisdom, moral depth, and true humanity are like the well's water — they do not diminish with use. The only tragedy is a full well from which no one draws, a potential greatness that goes unrecognized and unused."
  },

  49: {
    name: "Ge — Revolution (Molting)",
    judgment: "Revolution. On your own day you are believed. Supreme success, furthering through perseverance. Remorse disappears.",
    image: "Fire in the lake: The image of Revolution. Thus the superior man sets the calendar in order and makes the seasons clear.",
    lines: [
      "Wrapped in the hide of a yellow cow.",
      "When one's own day comes, one may create revolution. Starting brings good fortune. No blame.",
      "Starting brings misfortune. Perseverance brings danger. When talk of revolution has gone the rounds three times, one may commit himself.",
      "Remorse disappears. Men believe him. Changing the form of government brings good fortune.",
      "The great man changes like a tiger. Even before he questions the oracle he is believed.",
      "The superior man changes like a panther. The inferior man molts in the face."
    ],
    meaning:
      "Revolution is the fundamental transformation of what has become untenable — not hasty rebellion, but the necessary change that comes when the old order can no longer serve life. Fire and water in opposition: the tension becomes creative. The calendar itself is revolution's greatest symbol — the reassertion of natural order against accumulated error. Change must be well-timed, deeply considered, and grounded in genuine benefit to all, not personal ambition."
  },

  50: {
    name: "Ding — The Cauldron",
    judgment: "The Cauldron. Supreme good fortune. Success.",
    image: "Fire over wood: The image of the Cauldron. Thus the superior man consolidates his fate by making his position correct.",
    lines: [
      "A cauldron with legs upturned. It furthers one to remove stagnating stuff.",
      "There is food in the cauldron. My comrades are envious, but they cannot harm me. Good fortune.",
      "The handle of the cauldron is altered. One is impeded in his way of life.",
      "The legs of the cauldron are broken. The prince's meal is spilled and his person is soiled. Misfortune.",
      "The cauldron has yellow handles, golden carrying rings. Perseverance furthers.",
      "The cauldron has rings of jade. Great good fortune. Nothing that would not act to further."
    ],
    meaning:
      "The Cauldron is the vessel of transformation — wood feeds fire, fire transforms raw ingredients into nourishment for body and spirit. This is the hexagram of culture, civilization, and the refining of the human person. Just as the cauldron must be properly formed, properly filled, and properly tended to produce nourishment, so the person seeking wisdom must cultivate the right conditions within for genuine inner transformation to occur."
  },

  51: {
    name: "Zhen — The Arousing (Thunder)",
    judgment: "Shock brings success. Shock comes — oh, oh! Laughing words — ha, ha! The shock terrifies for a hundred miles.",
    image: "Thunder repeated: The image of Shock. Thus in fear and trembling the superior man sets his life in order and examines himself.",
    lines: [
      "Shock comes — oh, oh! Then follow laughing words — ha, ha! Good fortune.",
      "Shock comes bringing danger. A hundred thousand times you lose your treasures and must climb the nine hills.",
      "Shock comes and makes one distraught. If shock spurs to action one remains free of misfortune.",
      "Shock is mired.",
      "Shock goes hither and thither. Danger. However, nothing at all is lost. Yet there are things to be done.",
      "Shock brings ruin and terrified gazing around. Going ahead brings misfortune. If it has not yet touched one's own body but has reached one's neighbor first, there is no blame."
    ],
    meaning:
      "Zhen is the sudden shock of thunder — the bolt from the blue that jolts the complacent awake. The first response is terror; then, in those with genuine inner stability, laughter: the shock has passed, and one is still standing. The person who uses shock as a prompt for self-examination and renewal transforms even catastrophe into a source of life. Fear without paralysis, awakening without panic — this is the gift of thunder."
  },

  52: {
    name: "Gen — Keeping Still (Mountain)",
    judgment: "Keeping still. Keeping his back still so that he no longer feels his body. He goes into his courtyard and does not see his people. No blame.",
    image: "Mountains standing close together: The image of Keeping Still. Thus the superior man does not permit his thoughts to go beyond his situation.",
    lines: [
      "Keeping his toes still. No blame. Continued perseverance furthers.",
      "Keeping his calves still. He cannot rescue him whom he follows. His heart is not glad.",
      "Keeping his hips still. Making his sacrum stiff. Dangerous.",
      "Keeping his trunk still. No blame.",
      "Keeping his jaws still. The words are well-ordered. Remorse disappears.",
      "Noblehearted keeping still. Good fortune."
    ],
    meaning:
      "Gen is stillness — the mountain's capacity to be absolutely present without reaching beyond itself. The art of keeping still is not suppression or avoidance but total presence within the boundaries of the moment: not permitting thought to wander into the future or past, giving complete attention to what is directly before one. In this stillness, the deepest energies are conserved and the highest clarity is achieved. Action and rest are both expressions of the same presence."
  },

  53: {
    name: "Jian — Development (Gradual Progress)",
    judgment: "Development. The maiden is given in marriage. Good fortune. Perseverance furthers.",
    image: "Wood on the mountain: The image of Development. Thus the superior man abides in dignity and virtue, in order to improve the mores.",
    lines: [
      "The wild goose gradually draws near the shore. The young son is in danger. There is talk. No blame.",
      "The wild goose gradually draws near the cliff. Eating and drinking in peace and concord. Good fortune.",
      "The wild goose gradually draws near the plateau. The man goes forth and does not return. The woman carries a child but does not bring it forth.",
      "The wild goose gradually draws near the tree. Perhaps it will find a flat branch. No blame.",
      "The wild goose gradually draws near the summit. For three years the woman has no child.",
      "The wild goose gradually draws near the clouds. Its feathers can be used for the sacred dance. Good fortune."
    ],
    meaning:
      "Like a wild goose following its migration path — step by careful step, from shore to cliff to plateau — true development is gradual, organic, and cannot be forced. Jian is the counterpart to the marriage ritual: the proper path through stages, each step firmly established before the next is taken. The tree grown slowly on the mountain withstands any wind; character built patiently through right stages becomes a model for society."
  },

  54: {
    name: "Gui Mei — The Marrying Maiden",
    judgment: "The Marrying Maiden. Undertakings bring misfortune. Nothing that would further.",
    image: "Thunder over the lake: The image of the Marrying Maiden. Thus the superior man understands the transitory in the light of the eternity of the end.",
    lines: [
      "The marrying maiden as a concubine. A lame man who is able to tread. Undertakings bring good fortune.",
      "A one-eyed man who is able to see. The perseverance of a solitary man furthers.",
      "The marrying maiden as a slave. She marries as a concubine.",
      "The marrying maiden draws out the allotted time. A late marriage comes in due course.",
      "The sovereign gives his daughter in marriage. Her embroidered garments were not as gorgeous as those of the servingmaid.",
      "The woman holds the basket, but there are no fruits in it. The man stabs the sheep, but no blood flows."
    ],
    meaning:
      "Gui Mei addresses the difficulties of a secondary or dependent relationship — the position of one who enters a situation not on their own terms. The temptation is to overreach, to claim more than one's station allows. The wisdom is to accept one's actual position honestly and fulfill it with integrity: the lame man who can still walk, the one-eyed man who can still see. Transitory arrangements accepted gracefully can still yield lasting value."
  },

  55: {
    name: "Feng — Abundance",
    judgment: "Abundance has success. The king attains abundance. Be not sad. Be like the sun at midday.",
    image: "Thunder and lightning arrive together: The image of Abundance. Thus the superior man decides lawsuits and carries out punishments.",
    lines: [
      "When a man meets his destined ruler, they can be together ten days, and it is not a mistake. Going meets with recognition.",
      "The curtain is of such fullness that the polestars can be seen at noon. Through going one meets with mistrust and hate.",
      "The underbrush is of such abundance that the small stars can be seen at noon.",
      "The curtain is of such fullness that the polestars can be seen at noon.",
      "Lines are coming. Blessing and fame draw near.",
      "His house is in a state of abundance. He screens off his family. He peers through the gate and no longer perceives anyone there."
    ],
    meaning:
      "Feng is the noon of existence — peak abundance, maximum clarity, thunder and lightning arriving together in magnificent power. But the sun at its height has already begun to descend; this is the nature of all peaks. The wise person acts decisively at the height of fortune — using clarity to render just judgment, using power to accomplish what needs doing — without becoming attached to the fullness, knowing that all abundance is transitory."
  },

  56: {
    name: "Lu — The Wanderer",
    judgment: "The Wanderer. Success through smallness. Perseverance brings good fortune to the wanderer.",
    image: "Fire on the mountain: The image of the Wanderer. Thus the superior man is clear-minded and cautious in imposing penalties, and protracts no lawsuits.",
    lines: [
      "If the wanderer busies himself with trivial things, he draws down misfortune upon himself.",
      "The wanderer comes to an inn. He has his property with him. He wins the steadfastness of a young servant.",
      "The wanderer's inn burns down. He loses the steadfastness of his young servant. Danger.",
      "The wanderer rests in a shelter. He obtains his property and an ax.",
      "He shoots a pheasant. It drops with the first arrow. In the end this brings both praise and office.",
      "The bird's nest burns up. The wanderer laughs at first, then must needs lament."
    ],
    meaning:
      "Lu is the stranger in a foreign land — without roots, without community, moving through the world with only what can be carried. The fire on the mountain illuminates but does not warm; brilliance without belonging. The wanderer's wisdom is smallness: claiming little, making no enemies, maintaining careful conduct, and preserving the one constant companion — inner integrity. What cannot be replaced is not possessions but relationships; the wanderer who forgets this loses everything."
  },

  57: {
    name: "Xun — The Gentle (Wind)",
    judgment: "The Gentle. Success through what is small. It furthers one to have somewhere to go. It furthers one to see the great man.",
    image: "Winds following one upon the other: The image of the Gently Penetrating. Thus the superior man spreads his commands abroad and carries out his undertakings.",
    lines: [
      "In advancing and in retreating, the perseverance of a warrior furthers.",
      "Penetration under the bed. Priests and magicians are used in great number. Good fortune. No blame.",
      "Repeated penetration. Humiliation.",
      "Remorse vanishes. During the hunt three kinds of game are caught.",
      "Perseverance brings good fortune. Remorse vanishes.",
      "Penetration under the bed. He loses his property and his ax. Perseverance brings misfortune."
    ],
    meaning:
      "Xun is the wind that penetrates everywhere — gentle, persistent, continuous. Unlike sudden force, gentle penetration works by wearing away resistance through constancy. The wind bends every blade of grass; the ruler's commands spread across the land through repeated, consistent example. This hexagram teaches that sustained, gentle influence — applied with clear direction and without vacillation — achieves what raw power cannot. But gentleness without direction becomes mere drifting."
  },

  58: {
    name: "Dui — The Joyous (Lake)",
    judgment: "The Joyous. Success. Perseverance is favorable.",
    image: "Lakes resting one on the other: The image of the Joyous. Thus the superior man joins with his friends for discussion and practice.",
    lines: [
      "Contented joyousness. Good fortune.",
      "Sincere joyousness. Good fortune. Remorse disappears.",
      "Coming joyousness. Misfortune.",
      "Joyousness that is weighed is not at peace. After ridding himself of mistakes a man has joy.",
      "Sincerity toward disintegrating influences is dangerous.",
      "Seductive joyousness."
    ],
    meaning:
      "Dui is the joyous lake — open, reflective, and nourishing. Two lakes reinforcing each other capture the joy of genuine friendship and intellectual exchange: two minds encouraging each other, deepening each other. True joy is not frivolous pleasure but the deep satisfaction that comes from sincere connection and shared practice. The hexagram warns against joy that flatters and seduces — the outer lake whose surface glitters but whose depths are hollow."
  },

  59: {
    name: "Huan — Dispersion",
    judgment: "Dispersion. Success. The king approaches his temple. It furthers one to cross the great water. Perseverance furthers.",
    image: "The wind drives over the water: The image of Dispersion. Thus the kings of old sacrificed to the Lord and built temples.",
    lines: [
      "He brings help with the strength of a horse. Good fortune.",
      "At the dissolution he hurries to that which supports him. Remorse disappears.",
      "He dissolves his self. No remorse.",
      "He dissolves his bond with his group. Supreme good fortune.",
      "His loud cries are as dissolving as sweat. Dissolution! A king abides without blame.",
      "He dissolves his blood. Departing, keeping at a distance, going out, is without blame."
    ],
    meaning:
      "Huan dissolves what has become rigid and separating — the frozen barriers between people, the hardened ego that resists connection. Wind moving over water creates ripples that spread outward in all directions; dissolving the fixity of self allows one to flow into larger wholes. The ancient kings used ritual and music to dissolve the barriers between heaven and earth, self and other. The highest dissolution is not self-destruction but transcendence of the separate ego into something greater."
  },

  60: {
    name: "Jie — Limitation",
    judgment: "Limitation. Success. Galling limitation must not be persevered in.",
    image: "Water over lake: The image of Limitation. Thus the superior man creates number and measure, and examines the nature of virtue and correct conduct.",
    lines: [
      "Not going out of the door and the courtyard is without blame.",
      "Not going out of the gate and the courtyard brings misfortune.",
      "He who knows no limitation will have cause to lament. No blame.",
      "Contented limitation. Success.",
      "Sweet limitation brings good fortune. Going brings esteem.",
      "Galling limitation. Perseverance brings misfortune. Remorse disappears."
    ],
    meaning:
      "Jie is limitation as creative principle — the banks that give the river its power, the form that gives music its beauty. Without limitation there is no definition, no character, no art. The superior person sets conscious boundaries in life: of time, of resources, of conduct — and these boundaries, freely chosen, become expressions of integrity rather than constraints. But limitation imposed without inner acceptance becomes galling, and galling limitation persevered in leads only to exhaustion."
  },

  61: {
    name: "Zhong Fu — Inner Truth",
    judgment: "Inner Truth. Pigs and fishes. Good fortune. It furthers one to cross the great water. Perseverance furthers.",
    image: "Wind over lake: The image of Inner Truth. Thus the superior man discusses criminal cases in order to delay executions.",
    lines: [
      "Being prepared brings good fortune. If there are secret designs, it is disquieting.",
      "A crane calling in the shade. Its young answers it. I have a good goblet; I will share it with you.",
      "He finds a comrade. Now he beats the drum, now he stops. Now he sobs, now he sings.",
      "The moon nearly at the full. The team horse goes astray. No blame.",
      "He possesses truth, which links together. No blame.",
      "Cockcrow penetrating to heaven. Perseverance brings misfortune."
    ],
    meaning:
      "Zhong Fu — inner truth, central sincerity — is the hexagram of the resonance that genuine truth creates. Wind moving over the lake stirs it to its depths without touching it; a crane calling in the shade is answered by its unseen young. When a person is truly sincere at their core, that sincerity reaches even the most resistant hearts — even pigs and fishes respond to it. Inner truth is not what one claims to believe but what one actually is, in the most private chambers of the self."
  },

  62: {
    name: "Xiao Guo — Preponderance of the Small",
    judgment: "Preponderance of the Small. Success. Perseverance furthers. Small things may be done; great things should not be done.",
    image: "Thunder on the mountain: The image of Preponderance of the Small. Thus in his conduct the superior man gives preponderance to reverence. In bereavement he gives preponderance to grief. In his expenditures he gives preponderance to thrift.",
    lines: [
      "The bird meets with misfortune through flying.",
      "She passes by her ancestor and meets her ancestress. He does not reach his prince and meets the official.",
      "If one is not extremely careful, somebody may come up from behind and strike him. Misfortune.",
      "No blame. He meets him without passing by. Going brings danger. One must be on guard.",
      "Dense clouds, no rain from our western territory. The prince shoots and hits him who is in the cave.",
      "He passes him by, not meeting him. The flying bird leaves him. Misfortune."
    ],
    meaning:
      "Preponderance of the Small counsels extraordinary care in ordinary things when the time does not favor great undertakings. The bird that flies too high is shot; the one that stays near the earth survives. This is a time for humility, attentiveness to detail, and scrupulous correctness in small matters: extra care in showing respect, extra depth in expressing grief, extra restraint in spending. The small excess of care and reverence protects against the large disasters of overreaching."
  },

  63: {
    name: "Ji Ji — After Completion",
    judgment: "After Completion. Success in small matters. Perseverance furthers. At the beginning good fortune, at the end disorder.",
    image: "Water over fire: The image of After Completion. Thus the superior man takes thought of misfortune and arms himself against it in advance.",
    lines: [
      "He brakes his wheels. He gets his tail in the water. No blame.",
      "The woman loses the curtain of her carriage. Do not run after it; on the seventh day you will get it back.",
      "The Illustrious Ancestor disciplines the Devil's Country. After three years he conquers it.",
      "The finest clothes turn to rags. Be careful all day long.",
      "The neighbor in the east who slaughters an ox does not attain as much real happiness as the neighbor in the west with his small offering.",
      "He gets his head in the water. Danger."
    ],
    meaning:
      "Ji Ji — after completion — is the paradox of perfect order: every line in its correct place, yet the very perfection carries within it the seed of decline. The moment of achievement is also the moment of greatest vulnerability. The wise person who has brought something to completion immediately begins preparing for what might go wrong, never resting in self-congratulation. In the I Ching, completion is not an ending but a new beginning — and beginnings always contain the possibility of disorder."
  },

  64: {
    name: "Wei Ji — Before Completion",
    judgment: "Before Completion. Success. But if the little fox, after nearly completing the crossing, gets his tail in the water, there is nothing that would further.",
    image: "Fire over water: The image of the Condition Before Transition. Thus the superior man is careful in the differentiation of things, so that each finds its place.",
    lines: [
      "He gets his tail in the water. Humiliating.",
      "He brakes his wheels. Perseverance brings good fortune.",
      "Before completion, attack brings misfortune. It furthers one to cross the great water.",
      "Perseverance brings good fortune. Remorse disappears. Shock, thus to discipline the Devil's Country.",
      "Perseverance brings good fortune. No remorse. The light of the superior man is true.",
      "There is drinking of wine in genuine confidence. No blame. But if one wets his head, he loses it, in truth."
    ],
    meaning:
      "Wei Ji — before completion — is the final hexagram of the I Ching, and fittingly it does not end but opens. Fire above water: the two forces not yet reconciled, the transformation not yet achieved. This is the condition of perpetual transition — of being always on the threshold. The young fox nearly crosses but wets its tail at the last moment; care is needed precisely at the point of apparent victory. The I Ching ends here because the world itself is always in the condition of before completion — ever becoming, never finally fixed, endlessly alive."
  },

};

// 9 - 16

