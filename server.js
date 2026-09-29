<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>1Tap Earn - Official Eco-system</title>
    <script src="https://telegram.org"></script>
    <script src="https://adsgram.ai"></script>
    <style>
        * { box-sizing: border-box; user-select: none; }
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background: #0b0f19; color: #ffffff; text-align: center; margin: 0; padding: 20px; display: flex; flex-direction: column; align-items: center; justify-content: space-between; min-height: 100vh; }
        .header { width: 100%; display: flex; justify-content: space-between; padding: 10px; background: rgba(255,255,255,0.05); border-radius: 12px; font-size: 14px; }
        .score-container { margin-top: 40px; }
        .score-title { font-size: 16px; color: #8a99ad; letter-spacing: 1px; }
        .score-value { font-size: 48px; font-weight: 800; color: #ffcc00; margin: 5px 0; }
        .game-area { margin: 30px 0; position: relative; }
        .circle-btn { width: 220px; height: 220px; border-radius: 50%; background: radial-gradient(circle, #2563eb 0%, #1d4ed8 100%); border: 8px solid rgba(255,255,255,0.1); box-shadow: 0 0 30px rgba(37,99,235,0.5); cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 28px; font-weight: bold; transition: transform 0.05s; }
        .circle-btn:active { transform: scale(0.95); }
        .circle-btn:disabled { background: #374151; box-shadow: none; border-color: #4b5563; cursor: not-allowed; }
        .progress-container { width: 80%; max-width: 300px; background: #1f2937; height: 14px; border-radius: 10px; overflow: hidden; margin-top: 10px; }
        .progress-bar { width: 100%; height: 100%; background: linear-gradient(90deg, #3b82f6, #10b981); transition: width 0.1s; }
        .energy-text { font-size: 14px; color: #9ca3af; margin-top: 5px; }
        .streak-btn { background: #10b981; color: white; border: none; padding: 10px 20px; border-radius: 20px; font-weight: bold; font-size: 14px; margin-top: 20px; cursor: pointer; }
    </style>
</head>
<body>

    <!-- टॉप हेडर (डेली स्ट्रीक और एड्स ट्रैकर) -->
    <div class="header">
        <div>🔥 Streak: <span id="streakDays">0</span> Days</div>
        <div>📺 Ads Watched: <span id="adCount">0</span></div>
    </div>

    <!-- स्कोर बोर्ड -->
    <div class="score-container">
        <div class="score-value" id="taps">0 / 200</div>
        <div class="score-title">TAPS UNTIL NEXT LEVEL</div>
    </div>

    <!-- मेन माइनिंग बटन -->
    <div class="game-area">
        <button class="circle-btn" id="tapBtn" onclick="handleTap()">1TAP</button>
    </div>

    <!-- एनर्जी बार सिस्टम -->
    <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
        <div class="progress-container">
            <div class="progress-bar" id="energyBar"></div>
        </div>
        <div class="energy-text">⚡ <span id="energyValue">1000</span> / 1000</div>
        
        <!-- डेली रिवॉर्ड बटन -->
        <button class="streak-btn" id="streakBtn" onclick="claimDailyReward()">🎁 Claim Daily Reward</button>
    </div>

    <script>
        const tg = window.Telegram.WebApp;
        tg.expand();

        let taps = 0;
        let totalAds = 0;
        let energy = 1000;
        let maxEnergy = 1000;
        let streak = 0;

        // Adsgram Integration (यहाँ अपनी असली ID डालना)
        const AdController = window.Adsgram.init({ blockId: "YOUR_ADSGRAM_BLOCK_ID" });

        // टैप हैंडलर और एनर्जी बार लॉजिक
        function handleTap() {
            if (energy > 0 && taps < 200) {
                taps++;
                energy = energy - 5; // हर टैप पर 5 एनर्जी कम होगी
                updateUI();

                if (taps === 200) {
                    document.getElementById('tapBtn').disabled = true;
                    triggerAd();
                }
            }
        }

        function triggerAd() {
            AdController.show().then(() => {
                totalAds++;
                taps = 0;
                document.getElementById('tapBtn').disabled = false;
                updateUI();
                // यहाँ बैकएंड (Firebase) में डेटाबेस सेव होगा
            }).catch(() => {
                alert("Please watch the full video to continue.");
                document.getElementById('tapBtn').disabled = false;
            });
        }

        // एनर्जी ऑटो-रीचार्ज सिस्टम (हर 1 सेकंड में 2 एनर्जी बढ़ेगी)
        setInterval(() => {
            if (energy < maxEnergy) {
                energy = Math.min(maxEnergy, energy + 2);
                updateUI();
            }
        }, 1000);

        function claimDailyReward() {
            streak++;
            document.getElementById('streakBtn').disabled = true;
            document.getElementById('streakBtn').innerText = "✅ Claimed Today";
            updateUI();
        }

        function updateUI() {
            document.getElementById('taps').innerText = taps + " / 200";
            document.getElementById('adCount').innerText = totalAds;
            document.getElementById('streakDays').innerText = streak;
            document.getElementById('energyValue').innerText = energy;
            
            let energyPercentage = (energy / maxEnergy) * 100;
            document.getElementById('energyBar').style.width = energyPercentage + "%";
        }
    </script>
</body>
</html>
