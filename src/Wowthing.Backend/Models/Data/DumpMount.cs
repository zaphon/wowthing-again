﻿using CsvHelper.Configuration.Attributes;

// ReSharper disable InconsistentNaming
namespace Wowthing.Backend.Models.Data
{
    public class DumpMount
    {
        public int ID { get; set; }
        public int SourceSpellID { get; set; }
        
        [Name("Name_lang")]
        public string Name { get; set; }
    }
}
