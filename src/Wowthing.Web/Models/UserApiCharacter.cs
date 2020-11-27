﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wowthing.Lib.Enums;
using Wowthing.Lib.Models;

namespace Wowthing.Web.Models
{
    public class UserApiCharacter
    {
        public int ClassId { get; set; }
        public int Level { get; set; }
        public int RaceId { get; set; }
        public int RealmId { get; set; }
        public string Name { get; set; }
        public WowFaction Faction { get; set; }
        public WowGender Gender { get; set; }
        public Dictionary<int, int> Reputations { get; set; } = new Dictionary<int, int>();

        public UserApiCharacter(PlayerCharacter character, bool pub = false, bool anon = false)
        {
            ClassId = character.ClassId;
            Faction = character.Faction;
            Gender = character.Gender;
            Level = character.Level;
            RaceId = character.RaceId;

            if (pub && anon)
            {
                Name = "SecretGoose008";
            }
            else
            {
                Name = character.Name;
                RealmId = character.RealmId;
            }

            if (character.ReputationIds != null && character.ReputationValues != null)
            {
                Reputations = character.ReputationIds.Zip(character.ReputationValues)
                    .ToDictionary(k => k.First, v => v.Second);
            }
        }
    }
}
