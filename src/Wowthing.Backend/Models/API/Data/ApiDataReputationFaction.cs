﻿using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;

namespace Wowthing.Backend.Models.API.Data
{
    public class ApiDataReputationFaction
    {
        public int Id { get; set; }
        public string Name { get; set; }
        [JsonProperty("reputation_tiers")]
        public ApiObnoxiousObject Tiers { get; set; }
    }
}
