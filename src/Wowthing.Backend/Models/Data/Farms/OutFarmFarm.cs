﻿using System;
using System.Collections.Generic;
using System.Linq;
using Wowthing.Lib.Extensions;

namespace Wowthing.Backend.Models.Data.Farms
{
    public class OutFarmFarm
    {
        public int NpcId { get; set; }
        public int QuestId { get; set; }
        public string[] Location { get; set; }
        public string Name { get; set; }
        public string Note { get; set; }
        public string Reset { get; set; }
        
        public List<OutFarmDrop> Drops { get; set; }

        public OutFarmFarm(DataFarmFarm farm)
        {
            Drops = farm.Drops
                .EmptyIfNull()
                .Select(drop => new OutFarmDrop(drop))
                .ToList();
            Location = (farm.Location ?? "").Split();
            Name = farm.Name;
            NpcId = farm.NpcId;
            Note = farm.Note;
            QuestId = farm.QuestId;
            Reset = farm.Reset ?? "daily";
        }
    }
}
